import fs from "fs";
import path from "path";

const ALLOWED_STATUSES = new Set(["new", "in_review", "quoted", "bound", "declined"]);

function json(statusCode, payload) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };
}

export async function handler(event) {
  try {
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      };
    }

    if (event.httpMethod !== "POST") {
      return json(405, { error: "Method Not Allowed" });
    }

    if (!event.body) {
      return json(400, { error: "Missing request body" });
    }

    let update;
    try {
      update = JSON.parse(event.body);
    } catch {
      return json(400, { error: "Invalid JSON body" });
    }

    const id = String(update?.id ?? "").trim();
    const status = String(update?.status ?? "").trim();
    const assignedAgent =
      update?.assignedAgent == null ? "" : String(update.assignedAgent).trim();
    const notes = update?.notes == null ? "" : String(update.notes).trim();

    if (!id) return json(400, { error: "Missing quote id" });
    if (!status || !ALLOWED_STATUSES.has(status)) {
      return json(400, { error: "Invalid status" });
    }

    const filePath = path.join(process.cwd(), "data", "quotes.json");
    if (!fs.existsSync(filePath)) {
      return json(500, { error: "quotes.json not found on server" });
    }

    let quotes;
    try {
      quotes = JSON.parse(fs.readFileSync(filePath, "utf8"));
      if (!Array.isArray(quotes)) throw new Error("quotes data must be an array");
    } catch {
      return json(500, { error: "Failed to parse quotes data" });
    }

    const index = quotes.findIndex((q) => String(q?.id) === id);
    if (index === -1) {
      return json(404, { error: "Quote not found" });
    }

    quotes[index] = {
      ...quotes[index],
      status,
      assignedAgent,
      notes,
      updatedAt: new Date().toISOString(),
    };

    // NOTE: Works for local dev; NOT a persistent production datastore on Netlify.
    fs.writeFileSync(filePath, JSON.stringify(quotes, null, 2));

    return json(200, { success: true, quote: quotes[index] });
  } catch (err) {
    return json(500, { error: "Unexpected server error", detail: String(err?.message || err) });
  }
}
