const {Readable, Writable, Duplex} = require("stream")

const outStream = new Writable({
  write(chunk, _, callback) {
    console.log(chunk.toString())
    callback()
  }
})

const inStream = new Readable({
  read() {
    const data = "a"
    this.push(data)
  }
})

// inStream.pipe(outStream)

inStream.on("data", (chunk) => {
  console.log("on data")
  outStream.write(chunk)
})

inStream.on("end", (chunk) => {
  console.log("on end")
})

inStream.pause()

inStream.read()
inStream.read()
inStream.read()

inStream.push(null)
