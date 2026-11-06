const DOCUMENT_PREFIX = "github_erd_document_";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type !== "OPEN_GITHUB_ERD") return;

  (async () => {
    if (typeof message.text !== "string" || !message.text.trim()) {
      throw new Error("ERD 파일 내용이 없습니다.");
    }
    if (typeof sender.url !== "string" || !sender.url.startsWith("https://github.com/")) {
      throw new Error("GitHub 파일 화면에서만 열 수 있습니다.");
    }

    const key = DOCUMENT_PREFIX + crypto.randomUUID();
    await chrome.storage.session.set({
      [key]: {
        text: message.text,
        filename: String(message.filename || "ERD"),
        sourceUrl: sender.url
      }
    });

    try {
      const tab = await chrome.tabs.create({
        url: chrome.runtime.getURL(`viewer.html#${key}`),
        active: true,
        ...(sender.tab?.windowId == null ? {} : { windowId: sender.tab.windowId }),
        ...(sender.tab?.id == null ? {} : { openerTabId: sender.tab.id })
      });
      const stored = await chrome.storage.session.get(key);
      if (stored[key]) {
        stored[key].tabId = tab.id;
        await chrome.storage.session.set({ [key]: stored[key] });
      }
    } catch (error) {
      await chrome.storage.session.remove(key);
      throw error;
    }
    return { ok: true };
  })().then(sendResponse, (error) => sendResponse({ ok: false, error: String(error) }));

  return true;
});

chrome.tabs.onRemoved.addListener(async (tabId) => {
  const stored = await chrome.storage.session.get(null);
  const keys = Object.keys(stored).filter(
    (key) => key.startsWith(DOCUMENT_PREFIX) && stored[key]?.tabId === tabId
  );
  if (keys.length) await chrome.storage.session.remove(keys);
});
