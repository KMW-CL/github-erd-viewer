const viewer = document.querySelector("erd-viewer");
const status = document.querySelector("#status");
const filename = document.querySelector("#filename");
const sourceLink = document.querySelector("#source-link");

(async () => {
  const key = decodeURIComponent(location.hash.slice(1));
  if (!key.startsWith("github_erd_document_")) {
    status.textContent = "GitHub 파일 화면에서 ERD 새 탭에서 보기를 누르세요.";
    return;
  }

  try {
    const stored = await chrome.storage.session.get(key);
    const documentValue = stored[key];
    if (!documentValue || typeof documentValue.text !== "string") {
      throw new Error("ERD 데이터를 찾을 수 없습니다. GitHub 파일 화면에서 다시 열어 주세요.");
    }

    filename.textContent = documentValue.filename;
    document.title = `${documentValue.filename} · ERD 보기`;
    if (typeof documentValue.sourceUrl === "string" && documentValue.sourceUrl.startsWith("https://github.com/")) {
      sourceLink.href = documentValue.sourceUrl;
      sourceLink.hidden = false;
    }

    await viewer.setLocale("ko-KR");
    viewer.value = documentValue.text;
    status.textContent = "읽기 전용";
  } catch (error) {
    status.textContent = String(error);
    console.error("GitHub ERD Viewer:", error);
  }
})();
