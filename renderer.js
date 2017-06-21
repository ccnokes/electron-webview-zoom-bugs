const { webFrame } = require('electron');

// promisified setTimeout
function sleep(ms) {
  return new Promise((res, rej) => {
    setTimeout(res, ms);
  });
}

function addWebview(url) {
  const wv = document.createElement('webview');
  wv.setAttribute('src', url);
  document.body.appendChild(wv);
}

function hideWebviews() {
  console.log(`hide webview`);
  for(wv of document.querySelectorAll('webview')) {
    wv.classList.add('hide');
  }
}

function showWebviews() {
  console.log(`show webview`);
  for(wv of document.querySelectorAll('webview')) {
    wv.classList.remove('hide');
  }
}

function setZoom(factor) {
  console.info(`Set zoom to ${factor}`);
  webFrame.setZoomFactor(factor);
}

function resetTests() {
  for(wv of document.querySelectorAll('webview')) {
    wv.parentNode.removeChild(wv);
  }
  setZoom(1);
}

// This demonstrates how the webview zoom breaks if the zoom is set before it's loaded
function test1() {
  addWebview('https://github.com');
  setZoom(1.4);
}

// This demonstrates how the webview zoom breaks if the webview is hidden and then re-shown
async function test2() {
  addWebview('https://github.com');

  // NB: waiting till the webview has loaded before the zoom is set will not trigger the 
  // buggy behavior in test1
  await sleep(2000);
  setZoom(1.4);

  await sleep(2000);
  hideWebviews();
  await sleep(2000);
  // once it's shown again, its not filling its internal space 100%
  showWebviews(2000);
}

async function runTests() {
  console.log(`Run test 1`);
  test1();

  await sleep(3000);
  console.log(`resetting...`);
  resetTests();
  
  console.log(`Run test 2`);
  await sleep(1000);
  await test2();
}

runTests();