import data from './zipcode.json'
import find from 'lodash/find'
import path from 'path'

exports.handler = function(event, context, callback) {
  const zipcode = path.relative('/zipcode', event.path)

  callback(null, {
    statusCode: 200,
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(zipcode ? find(data, { zipcode }) : {})
  })
}
