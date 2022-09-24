require('dotenv').config();

const PLATFORM_ENV = process.env.PLATFORM_ENV;
const NODE_ENV = process.env.NODE_ENV;
const conf = {};
if(NODE_ENV == 'development'){
    if(PLATFORM_ENV == 'local'){
        conf.API_URL = 'http://localhost:5000';
    } else if (PLATFORM_ENV == 'remote'){
        conf.API_URL = 'https://uat.888bingo.ph';
    };
} else if (NODE_ENV == 'production'){
    if(PLATFORM_ENV == 'local'){
        conf.API_URL = 'https://888bingo.ph';
    } else if (PLATFORM_ENV == 'remote'){
        conf.API_URL = 'https://888bingo.ph';
    };
};



module.exports = conf;