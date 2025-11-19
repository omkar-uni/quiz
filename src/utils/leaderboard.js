const RAW_URL =
  "https://gist.githubusercontent.com/omkar-uni/13c1a50a6cdabb6cdec0883a326da5ea/raw/leaderboard.json";

// PUBLIC: Read leaderboard
export async function getLeaderboard() {
  try {
    const res = await fetch(RAW_URL, { cache: "no-cache" });
    return await res.json();
  } catch (e) {
    console.error("Failed to load leaderboard:", e);
    return [];
  }
}

// Detect API base URL
const API_BASE =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

// SECURE: Save score through API
export async function saveResult(result) {
  try {
    const res = await fetch(`${API_BASE}/api/saveLeaderboard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ result }),
    });

    if (!res.ok) {
      console.error("Save failed", await res.text());
    }
  } catch (e) {
    console.error("Save error:", e);
  }
}
