import * as cheerio from 'cheerio';
import * as fs from 'fs';

const $ = cheerio.load('<div id="main"><h2 class="title">Hello world</h2></div>');
console.log($('h2.title').find('.subtitle').text());
$('h2.title').text('Hello there!')
console.log($('h2.title').text());
$('h2').after('<h3>How are you?</h3>');
console.log($('#main').html());

const buffer = fs.readFileSync('./index.html');
const $1 = cheerio.loadBuffer(buffer);
console.log($1('body').html());
