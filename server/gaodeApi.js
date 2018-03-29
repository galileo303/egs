const express = require('express');
const Router = express.Router();
const axios = require('axios');



Router.get('/getLocation',function(req,res){
     const url = 'http://restapi.amap.com/v3/geocode/geo?'+encodeSearchParams(req.query)
     axios.get(url).then(function(doc){
     res.json(doc.data)
   })
})

Router.get('/getWay',function(req,res){
     const url = 'http://restapi.amap.com/v3/direction/transit/integrated?'+encodeSearchParams(req.query)
     axios.get(url).then(function(doc){
     res.json(doc.data)
   })
})



/**
 * 拼接对象为请求字符串
 * @param {Object} obj - 待拼接的对象
 * @returns {string} - 拼接成的请求字符串
 */
function encodeSearchParams(obj) {
  const params = []

  Object.keys(obj).forEach((key) => {
    let value = obj[key]
    // 如果值为undefined将其置空
    if (typeof value === 'undefined') {
      value = ''
    }
    // 对于需要编码的文本（比如说中文）我们要进行编码
    params.push([key, encodeURIComponent(value)].join('='))
  })

  return params.join('&')
}

module.exports = Router