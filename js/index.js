import * as cheerio from "cheerio";
import * as fs from "fs";

// load
const $ = cheerio.load(
  `<div id="main"><h2 class="title">Hello world</h2><ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul></div>`
);
console.log($("h2.title").find(".subtitle").text());
$("h2.title").text("Hello there!");
console.log($("h2.title").text());
$("h2").after("<h3>How are you?</h3>");
console.log($("#main").html());
console.log($("#main ul").find('li').length);
console.log($("#main ul").contents());
console.log($("#main ul").prop('tagName'));
console.log($("h2.title").prop('innerText'));
$("h2").append('<div id="test1">111111</div>')
$("h1").insertAfter('h2 #test1')
$("h2").prepend('<div>222222222</div>')
console.log($("h2").html());



// loadBuffer
const buffer = fs.readFileSync("./index.html");
const $1 = cheerio.loadBuffer(buffer);
console.log($1("body").html().trim());
console.log($1("head").html().trim());
console.log($1("meta[name]").attr("name"));
console.log($1("meta[name]").attr("content"));
console.log($1("meta[charset]").attr("charset"));
console.log($1('[data-selected=true]').text());

// 字符串流
const writeStream = cheerio.stringStream({}, (err, $) => {
  if (err) {
  }
  console.log($(".title").text());
});
fs.createReadStream("./index.html", { encoding: "utf8" }).pipe(writeStream);

// 从 URL 获取
const $2 = await cheerio.fromURL('https://example.com');
console.log($2.html());
