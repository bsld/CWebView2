
/**@type {string[]} */
let filenames = ["X3.jpg"]

//debugger

console.log(filenames)

//window.onload = function () {

window.chrome.webview.addEventListener('message',
    event => console.log(event.data), true)
console.log("test1")

window.chrome.webview.postMessage(filenames[0])

console.log("test")
//}