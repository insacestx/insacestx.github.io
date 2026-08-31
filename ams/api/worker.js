export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(env) });
    }

    // Route: create magic link + send agent email
    if (url.pathname === "/api/magic-link/create") {
      if (request.method !== "POST") {
        return json({ ok: false, error: "Method Not Allowed" }, 405, env);
      }
      return handleMagicLinkCreate(request, env);
    }

    return json({ ok: false, error: "Not Found" }, 404, env);
  }
};

async function handleMagicLinkCreate(request, env) {
  try {
    const body = await request.json();

    const leadId = safe(body.leadId);
    const leadNumber = safe(body.leadNumber);
    const agentEmail = safe(body.agentEmail).toLowerCase();
    const expiresMinutesRaw = Number(body.expiresMinutes || 120);
    const expiresMinutes = clamp(expiresMinutesRaw, 5, 1440); // 5 min to 24h

    const customerEmail = safe(body.customerEmail).toLowerCase();
    const customerName = safe(body.customerName);

    const language = safe(body.language || "EN");
    const phone = safe(body.phone);
    const lineOfBusiness = safe(body.lineOfBusiness);
    const stage = safe(body.stage);
    const notes = safe(body.notes);

    if (!leadId) return json({ ok: false, error: "leadId is required" }, 400, env);

    if (!agentEmail || !isEmail(agentEmail)) {
      return json({ ok: false, error: "Valid agentEmail is required" }, 400, env);
    }

    // Restrict recipients to your domain/team
    if (!agentEmail.endsWith("@insaces.com")) {
      return json({ ok: false, error: "agentEmail must be an @insaces.com address" }, 400, env);
    }

    // Build signed token payload
    const expiresAt = Date.now() + expiresMinutes * 60 * 1000;
    const tokenPayload = {
      leadId,
      agentEmail,
      exp: expiresAt
    };

    const token = await signToken(tokenPayload, env.MAGIC_LINK_SECRET);

    const appBase = (env.APP_BASE_URL || "https://insaces.com").replace(/\/+$/, "");
    const magicLink = `${appBase}/ams/leads/update.html?token=${encodeURIComponent(token)}`;

    // Send from noreply@insaces.com (critical for alignment)
    const emailResult = await sendViaResend({
      apiKey: env.RESEND_API_KEY,
      from: env.MAIL_FROM || "ACES Insurance <noreply@insaces.com>",
      to: [agentEmail],
      replyTo: isEmail(customerEmail) ? customerEmail : undefined,
      subject: `Lead Follow-up ${leadNumber ? `(${leadNumber})` : ""} - Secure Update Link`,
      html: buildHtml({
        leadNumber,
        customerName,
        customerEmail,
        language,
        phone,
        lineOfBusiness,
        stage,
        notes,
        magicLink,
        expiresMinutes
      }),
      text: buildText({
        leadNumber,
        customerName,
        customerEmail,
        language,
        phone,
        lineOfBusiness,
        stage,
        notes,
        magicLink,
        expiresMinutes
      })
    });

    if (!emailResult.ok) {
      return json({ ok: false, error: emailResult.error || "Email send failed" }, 502, env);
    }

    return json(
      {
        ok: true,
        message: "Secure link sent",
        providerId: emailResult.id || null,
        expiresMinutes
      },
      200,
      env
    );
  } catch (err) {
    return json({ ok: false, error: err?.message || "Unexpected server error" }, 500, env);
  }
}

async function sendViaResend({ apiKey, from, to, replyTo, subject, html, text }) {
  if (!apiKey) {
    return { ok: false, error: "Missing RESEND_API_KEY secret" };
  }

  const payload = {
    from,
    to,
    subject,
    html,
    text
  };

  if (replyTo) payload.reply_to = replyTo;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return {
      ok: false,
      error: data?.message || `Resend error (${res.status})`
    };
  }

  return { ok: true, id: data?.id || null };
}

function buildHtml(ctx) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
      <h2>Lead Follow-up ${escapeHtml(ctx.leadNumber || "")}</h2>
      <p>A secure lead update link was requested.</p>

      <p><strong>Customer:</strong> ${escapeHtml(ctx.customerName || "N/A")}</p>
      <p><strong>Customer Email:</strong> ${escapeHtml(ctx.customerEmail || "N/A")}</p>
      <p><strong>Language:</strong> ${escapeHtml(ctx.language || "N/A")}</p>
      <p><strong>Phone:</strong> ${escapeHtml(ctx.phone || "N/A")}</p>
      <p><strong>Line:</strong> ${escapeHtml(ctx.lineOfBusiness || "N/A")}</p>
      <p><strong>Stage:</strong> ${escapeHtml(ctx.stage || "N/A")}</p>
      <p><strong>Notes:</strong> ${escapeHtml(ctx.notes || "N/A")}</p>

      <p style="margin:20px 0">
        <a href="${escapeAttr(ctx.magicLink)}" style="background:#d40000;color:#fff;padding:10px 14px;text-decoration:none;border-radius:6px;">
          Open Secure Update Link
        </a>
      </p>

      <p>This link expires in ${Number(ctx.expiresMinutes)} minutes.</p>
    </div>
  `;
}

function buildText(ctx) {
  return [
    `Lead Follow-up ${ctx.leadNumber || ""}`,
    ``,
    `Customer: ${ctx.customerName || "N/A"}`,
    `Customer Email: ${ctx.customerEmail || "N/A"}`,
    `Language: ${ctx.language || "N/A"}`,
    `Phone: ${ctx.phone || "N/A"}`,
    `Line: ${ctx.lineOfBusiness || "N/A"}`,
    `Stage: ${ctx.stage || "N/A"}`,
    `Notes: ${ctx.notes || "N/A"}`,
    ``,
    `Secure Link: ${ctx.magicLink}`,
    `Expires in ${Number(ctx.expiresMinutes)} minutes.`
  ].join("\n");
}

// Simple signed token (payload.signature)
// NOTE: Ensure your update.html verifies signature + exp before trusting token.
async function signToken(payload, secret) {
  if (!secret) throw new Error("Missing MAGIC_LINK_SECRET");

  const enc = new TextEncoder();
  const data = enc.encode(JSON.stringify(payload));

  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const sig = await crypto.subtle.sign("HMAC", key, data);
  return `${base64Url(data)}.${base64Url(new Uint8Array(sig))}`;
}

function base64Url(uint8) {
  let s = "";
  for (const b of uint8) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function safe(v) {
  return String(v ?? "").trim();
}

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());
}

function clamp(n, min, max) {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, Math.floor(n)));
}

function escapeHtml(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttr(s) {
  return escapeHtml(s).replaceAll("`", "&#96;");
}

function corsHeaders(env) {
  const allowed = env.ALLOWED_ORIGIN || "https://insaces.com";
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Vary": "Origin"
  };
}

function json(obj, status = 200, env) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(env)
    }
  });
}
