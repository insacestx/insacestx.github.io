// /netlify/functions/updateQuote.js

import fs from "fs";
import path from "path";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const update = JSON.parse(event.body);

  const filePath = path.join(process.cwd(), "data", "quotes.json");
  const quotes = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const index = quotes.findIndex(q => q.id === update.id);
  if (index === -1) {
    return { statusCode: 404, body: "Quote not found" };
  }

  quotes[index] = {
    ...quotes[index],
    status: update.status,
    assignedAgent: update.assignedAgent,
    notes: update.notes
  };

  fs.writeFileSync(filePath, JSON.stringify(quotes, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
}
