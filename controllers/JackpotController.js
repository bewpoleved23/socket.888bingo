const axios = require('axios');
const conf = require('../config');

exports.getMainJackpot = function(){
    return axios({
        url:`${conf.API_URL}/api/jackpot/main-jackpot`,
        method:'GET'
    }).then(res=>{
        return {status:1,data:res.data};
    }).catch(err=>{
        return {status:0, message:err.message};
    });
}