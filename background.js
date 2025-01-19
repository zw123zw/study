const color = "#3aa757";

chrome.runtime.onInstalled.addListener(() => {
  console.log("插件已被安装");
  chrome.storage.sync.set({ color });
  console.log(`[Coloring] default background color is set to: ${color}`);
});

chrome.action.onClicked.addListener(function (tab) {
  chrome.action.setTitle({ tabId: tab.id, title: "You are on tab:" + tab.id });
  console.log(11111122222222);
});
