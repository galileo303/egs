const express = require('express');
const Router = express.Router();
const axios = require('axios');


Router.post('/upLoadFile', function (req, res) {
    console.log("---------------------------------------",req)
    console.log("---------------------------------------")
    const data = new FormData()
    data.append('file', req)
    axios({
            url: 'http://10.167.24.61:8080/webapi/upload',
            method: 'post',
        data: data,
        headers: { 'Content-Type': 'multipart/form-data' }
        }).then(doc=>{
        console.log(doc)
    })
   



})



module.exports = Router