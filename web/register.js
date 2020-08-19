import { Base64 } from "./node_modules/js-base64/base64.mjs"

/**@type {string[]} */
let filenames = ["X3.jpg"]

let filenametohash = new Map

//debugger

console.log(filenames)

//window.onload = function () {

function encode_utf16(s, littleEndian) {
    var a = new Uint8Array(s.length * 2), view = new DataView(a.buffer);
    s.split('').forEach(function (c, i) {
        view.setUint16(i * 2, c.charCodeAt(0), littleEndian);
    });
    return a;
}

window.chrome.webview.addEventListener('message', async function (event) {
    /**@type {string} */
    const str = event.data
    let hash

    for (const a of filenames)
        if (str.search(new RegExp(`^${a}`)) != -1) {
            hash = str.match(/(?<=^.+:).+(?=$)/)[0]
            filenametohash.set(a, hash)
            break
        }
    if (hash) return

    hash = await crypto.subtle.digest("SHA-512", encode_utf16(str, true))

    hash = Array.prototype.map.call(new Uint8Array(hash), x => ('00' + x.toString(16)).slice(-2)).join('')

    const encoder = new TextEncoder();

    let arraybuf = Base64.toUint8Array(str)

    const ds = new DecompressionStream('deflate')

    const decoded = new Blob([arraybuf]).stream().pipeThrough(ds)

    const decodedreader = decoded.getReader()

    let decodedread = []

    do
        decodedread.push(await decodedreader.read())

    while (!decodedread.done)

    debugger
})
console.log("test1")

window.chrome.webview.postMessage(filenames[0])

console.log("test")
//}