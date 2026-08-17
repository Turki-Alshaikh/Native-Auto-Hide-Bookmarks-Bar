chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getBookmarksData") {
    chrome.bookmarks.getTree((bookmarks) => {
      sendResponse({
        bookmarks: bookmarks,
        // جلب لغة واجهة المتصفح لتحديد الاتجاه (يمين-لليسار أو يسار-لليمين)
        uiLanguage: chrome.i18n.getUILanguage()
      });
    });
    return true; 
  }
});