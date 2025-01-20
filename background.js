chrome.runtime.onInstalled.addListener(() => {
  console.log("插件已被安装");
});

// 异步处理数据
const textList = [];
let pageList = [];
let pageNum = 0;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async () => {
    switch (request.type) {
      case "readText":
        getTextList({
          title: request.title,
          content: request.content,
        });
        sendResponse(pageList.length ? pageList[pageNum++] : 0);
        break;
      case "readPage":
        if (request.content) {
          getPageList(request.content);
        }
        sendResponse(pageList);
        break;
      case "downloadText":
        sendResponse(textList);
        break;
    }
  })();
  return true;
});

// 获取文件内容
const getTextList = (data) => {
  textList.push(data);
};

// 识别文字内容
const identifyText = (data) => {};

// 获取目录列表
const getPageList = (data) => {
  pageList = data;
};
