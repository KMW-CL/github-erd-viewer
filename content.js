(() => {
  let currentPath = "";
  let button = null;
  let pending = false;

  function isErdFilePath(pathname) {
    if (!/^\/[^/]+\/[^/]+\/blob\/[^/]+\//.test(pathname)) return false;
    try {
      return /\.(?:vuerd|erd)\.json$/i.test(decodeURIComponent(pathname));
    } catch {
      return false;
    }
  }

  function getDocumentText() {
    const source = document.querySelector("#read-only-cursor-text-area");
    const text = source?.value ?? source?.textContent ?? "";
    if (!text.trim()) return null;
    try {
      const documentValue = JSON.parse(text);
      if (
        !documentValue ||
        typeof documentValue !== "object" ||
        !documentValue.collections ||
        !documentValue.collections.tableEntities ||
        typeof documentValue.collections.tableEntities !== "object"
      ) return null;
    } catch {
      return null;
    }
    return text;
  }

  async function openViewer() {
    const text = getDocumentText();
    if (!text || !button) return;
    button.disabled = true;
    button.textContent = "ERD 탭 여는 중…";
    try {
      let filename = location.pathname.split("/").at(-1) || "ERD";
      try { filename = decodeURIComponent(filename); } catch { /* Keep the encoded name. */ }
      const response = await chrome.runtime.sendMessage({
        type: "OPEN_GITHUB_ERD",
        text,
        filename
      });
      if (!response?.ok) throw new Error(response?.error || "새 탭을 열 수 없습니다.");
    } catch (error) {
      console.error("GitHub ERD Viewer:", error);
      button.textContent = "다시 시도: ERD 새 탭에서 보기";
      button.title = String(error);
    } finally {
      button.disabled = false;
      if (button.textContent === "ERD 탭 여는 중…") button.textContent = "ERD 새 탭에서 보기";
    }
  }

  function sync() {
    pending = false;
    const pathname = location.pathname;
    if (pathname !== currentPath) {
      button?.remove();
      button = null;
      currentPath = pathname;
    }
    if (!isErdFilePath(pathname)) return;
    if (!getDocumentText()) {
      button?.remove();
      button = null;
      return;
    }
    if (button?.isConnected) return;
    button = document.createElement("button");
    button.id = "github-erd-viewer-open";
    button.type = "button";
    button.textContent = "ERD 새 탭에서 보기";
    button.addEventListener("click", openViewer);
    document.body.append(button);
  }

  function scheduleSync() {
    if (pending) return;
    pending = true;
    setTimeout(sync, 100);
  }

  new MutationObserver(scheduleSync).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
  window.addEventListener("popstate", scheduleSync);
  document.addEventListener("turbo:load", scheduleSync);
  scheduleSync();
})();
