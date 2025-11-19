import dotenv from "dotenv";
dotenv.config();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { result } = req.body;
  if (!result) {
    return res.status(400).json({ error: "Missing result data" });
  }

  const GIST_ID = process.env.GIST_ID;
  const FILE_NAME = process.env.GIST_FILENAME || "leaderboard.json";
  const TOKEN = process.env.GITHUB_TOKEN;

  const API_URL = `https://api.github.com/gists/${GIST_ID}`;

  try {
    // Fetch current gist data
    const gistRes = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    const gistData = await gistRes.json();

    if (!gistData.files || !gistData.files[FILE_NAME]) {
      return res
        .status(500)
        .json({ error: `File "${FILE_NAME}" not found in Gist` });
    }

    let leaderboard = JSON.parse(gistData.files[FILE_NAME].content || "[]");

    // Add new record
    leaderboard.push(result);

    // Update Gist
    await fetch(API_URL, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        files: {
          [FILE_NAME]: {
            content: JSON.stringify(leaderboard, null, 2),
          },
        },
      }),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
