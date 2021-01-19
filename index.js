const fs = require("fs")
const http = require("http")

const server = http.createServer()

server.on("request", (req, res) => {
  res.writeHead(200)
  const fileStream = fs.createReadStream("./big.txt")
  fileStream.pipe(res)
})

server.listen(3000)