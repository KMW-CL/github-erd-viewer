const viewer = document.querySelector("erd-viewer");
const status = document.querySelector("#status");
const filename = document.querySelector("#filename");
const sourceLink = document.querySelector("#source-link");

(async () => {
  const key = decodeURIComponent(location.hash.slice(1));
  if (!key.startsWith("github_erd_document_")) {
    status.textContent = "Open an ERD JSON file on GitHub and click Open ERD in new tab.";
    return;
  }

  try {
    const stored = await chrome.storage.session.get(key);
    const documentValue = stored[key];
    if (!documentValue || typeof documentValue.text !== "string") {
      throw new Error("ERD data was not found. Open it again from the GitHub file page.");
    }

    filename.textContent = documentValue.filename;
    document.title = `${documentValue.filename} · ERD Viewer`;
    if (typeof documentValue.sourceUrl === "string" && documentValue.sourceUrl.startsWith("https://github.com/")) {
      sourceLink.href = documentValue.sourceUrl;
      sourceLink.hidden = false;
    }

    await viewer.setLocale("en");
    viewer.value = documentValue.text;
    status.textContent = "Read-only";
  } catch (error) {
    status.textContent = String(error);
    console.error("GitHub ERD Viewer:", error);
  }
})();
