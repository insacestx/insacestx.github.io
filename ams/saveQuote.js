// /netlify/functions/saveQuote.js

import fs from "fs";
import path from "path";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const newQuote = JSON.parse(event.body);

  const filePath = path.join(process.cwd(), "data", "quotes.json");
  const fileData = fs.readFileSync(filePath, "utf8");
  const quotes = JSON.parse(fileData);

  quotes.push(newQuote);

  fs.writeFileSync(filePath, JSON.stringify(quotes, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
}
