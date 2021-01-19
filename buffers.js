const fs = require("fs/promises")

let buf = Buffer.alloc(26)
// let unsafeBuf = Buffer.allocUnsafe(8)

for (let i = 0 ; i < 26; i++) {
  buf[i] = i + 97
}

console.log(buf)
console.log(buf.toString("ascii"))
console.log(buf.toString("utf8"))

async function loadFile() {
  const file = await fs.readFile("./tiny.txt")
  console.log(file)

  file[0] = 97

  console.log(file.toString("utf8", 5, 10))
}
loadFile()
