import dotenv from "dotenv";
dotenv.config();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const GIST_ID = process.env.GIST_ID;
  const FILE_NAME = process.env.GIST_FILENAME || "leaderboard.json";
  const TOKEN = process.env.GITHUB_TOKEN;

  const API_URL = `https://api.github.com/gists/${GIST_ID}`;

  try {
    const gistRes = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    const gistData = await gistRes.json();

    if (!gistData.files || !gistData.files[FILE_NAME]) {
      return res.status(500).json({
        error: `File "${FILE_NAME}" not found in Gist`,
      });
    }

    const leaderboard = JSON.parse(gistData.files[FILE_NAME].content || "[]");

    return res.status(200).json(leaderboard);
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
