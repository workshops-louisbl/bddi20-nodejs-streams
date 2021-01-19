const { read } = require("fs")
const { Duplex } = require("stream")

const inOut = new Duplex({
  write(chunk, _, callback) {
    console.log("echo: ", chunk.toString())
    callback()
  },
  read(size) {
    const letter = String.fromCharCode(this.currentCharCode++)
    this.push(letter)
    if (this.currentCharCode > 90) {
      this.push(null)
    }
  }
})

inOut.currentCharCode = 65;

process.stdin
  .pipe(inOut)
  .pipe(process.stdout)
