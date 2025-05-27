import jsdom from "jsdom";

const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
console.log(window.document.querySelector("p").textContent); // "Hello world"

const dom = new JSDOM(``, {
  url: "https://example.org/",
  referrer: "https://example.com/",
  contentType: "text/html",
  includeNodeLocations: true,
  storageQuota: 10000000,
});

const dom1 = new JSDOM(
  `<body>
  <div id="content"></div>
  <script>document.getElementById("content").append(document.createElement("hr"));</script>
</body>`,
  { runScripts: "outside-only" }
);

// The script will not be executed, by default:
console.log(dom1.window.document.getElementById("content").children.length); // 0
dom1.window.eval('document.getElementById("content").append(document.createElement("p"));');
console.log(dom1.window.document.getElementById("content").children.length); // 1
console.log(dom1.window.document.getElementsByTagName("hr").length); // 0
console.log(dom1.window.document.getElementsByTagName("p").length); // 1

const frag = JSDOM.fragment(`<p>Hello</p><p><strong>Hi!</strong>`);
frag.childNodes.length === 2;
console.log(frag.firstChild.outerHTML); // logs "<p>Hello</p>"