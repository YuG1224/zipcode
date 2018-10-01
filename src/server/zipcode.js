import request from 'request'
import unzipper from 'unzipper'
import Encoding from 'encoding-japanese'
import csv from 'csvtojson'
import find from 'lodash/find'
import path from 'path'

exports.handler = function(event, context, callback) {
  const zipcode = path.parse(event.path).name
  unzipper.Open.url(request, 'https://www.post.japanpost.jp/zipcode/dl/kogaki/zip/ken_all.zip')
    .then(function (d) {
      var file = d.files[0]
      return file.buffer()
    })
    .then(function (buffer) {
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

          const data = find(jsonObj, { zipcode })
          console.log(data)

          callback(null, {
            statusCode: 200,
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(data)
          })

        })
    })

    .catch((error) => {
      console.log(error)

      callback(null, {
        statusCode: 500,
        body: error
      })
    })

}
