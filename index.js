// 自动翻页
const autoPager = () => {
  sendMessage({
    type: "readPage",
  }).then((response) => {
    if (response.length) {
      toReadText();
    } else {
      toReadPage();
    }
  });
};

// 读取文字内容
const toReadText = () => {
  sendMessage({
    type: "readText",
    title: "第一章",
    content: "111",
  }).then((response) => {
    if (response) {
      //   window.location.href = "http://127.0.0.1:5500/test.html";
      alert(111111);
    }
  });
};

// 读取目录列表
const toReadPage = () => {
  let data = [1111];
  sendMessage({
    type: "readPage",
    content: data,
  }).then((response) => {
    if (response.length) {
      toReadText();
      console.log(111111);
    }
  });
};

// 发送消息
const sendMessage = async (data) => {
  return chrome.runtime.sendMessage({
    ...data,
  });
};

// 下载文字
const downloadText = () => {
  chrome.runtime
    .sendMessage({
      type: "downloadText",
    })
    .then(() => {
      alert("111111");
    });
};

// 初始化
autoPager();
window.downloadText = downloadText;
