const stream  = require("stream")
const { Transform } = stream

const util = require("util")
const pipeline = util.promisify(stream.pipeline)

// a,b,c,d
// [a, b, c, d]
// {a: b, c: d}

const commaSplitter = new Transform({
  readableObjectMode: true,

  transform(chunk, encoding, callback) {
    const data = chunk.toString().trim().split(',')
    this.push(data)
    callback()
  }
})

const arrayToObject = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,
  
  transform(chunk, encoding, callback) {
    const data = {}

    for(let i = 0; i < chunk.length; i += 2) {
      data[chunk[i]] = chunk[i + 1]
    }

    this.push(data)
    callback()
  }
})

const jsonStringify = new Transform({
  writableObjectMode: true,

  transform(chunk, encoding, callback) {
    const data = JSON.stringify(chunk)
    this.push(data)
    callback()
  }
})

// process.stdin
//   .pipe(commaSplitter)
//   .pipe(arrayToObject)
//   .pipe(jsonStringify)
//   .pipe(process.stdout)

// pipeline(
//   process.stdin,
//   commaSplitter,
//   arrayToObject,
//   jsonStringify,
//   process.stdout,
//   (err) => {
//     if (err) {
//       console.error("erreur de traitement")
//       console.error(err)      
//     } else {
//       console.log("pipeline terminé avec succès")
//     }
//   }
// )

async function doTransform() {
  try {
    await pipeline(
      process.stdin,
      commaSplitter,
      arrayToObject,
      jsonStringify,
      process.stdout
    )
    console.log("pipeline terminé avec succès")
  } catch (err) {
    console.error("erreur de traitement")
    console.error(err)
  }
}

doTransform()