const axios = require('axios');
const conf = require('../config');

exports.get = function(user_id){
    return axios({
        url:`${conf.API_URL}/api/wallet/${user_id}`,
        method:'GET'
    }).then(res=>{
        return {status:1,data:res.data};
    }).catch(err=>{
        return {status:0, message:err.message};
    });
}