const http = require("http")

const server = http.createServer()

server.on("request", (req, res) => {
  req.setEncoding("utf8")
  req.on("data", (chunk) => {
    console.log(chunk)
  })
  
  req.on("end", () => {
    res.write("some data")
    res.end()
  })
})

server.listen(3000)