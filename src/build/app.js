const request = require('request')
const unzipper = require('unzipper')
const Encoding = require('encoding-japanese')
const csv = require('csvtojson')
const fs = require('fs-extra')

unzipper.Open.url(request, 'https://www.post.japanpost.jp/zipcode/dl/kogaki/zip/ken_all.zip')
  .then((d) => {
    var file = d.files[0]
    return file.buffer()
  })
  .then((buffer) => {
    const utf8String = Encoding.convert(buffer, {
      from: 'SJIS',
      to: 'UNICODE',
      type: 'string'
    })

    csv({
      noheader: true,
      headers: ['_', '_', 'zipcode', 'state_kana', 'city_kana', 'address_kana', 'state', 'city', 'address', '_', '_', '_', '_', '_', '_'],
      colParser: {
        '_': 'omit',
      },
    })
    .fromString(utf8String)
    .then((jsonObj) => {
      const filePath = process.env.NODE_ENV === 'production' ? './dist/functions/zipcode.json' : './src/server/zipcode.json'
      fs.outputJsonSync(filePath, jsonObj)
    })
  })