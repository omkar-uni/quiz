import results from "../data/studentResults.json";

export function saveResult(entry) {
  results.push(entry);

  // JSON stringify + download automatically
  const file = new Blob([JSON.stringify(results, null, 2)], {
    type: "application/json",
  });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download = "studentResults.json";
  a.click();
}
