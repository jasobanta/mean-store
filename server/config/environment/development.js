'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/dorbbyfullstack-dev'
  },

  // Seed database on startup
  seedDB: true,

  paytm: {
    MID: 'Dorbby12523857916438',
		WEBSITE: 'WEB_STAGING',
    CHANNEL_ID: 'WEB',
    INDUSTRY_TYPE_ID: 'Retail',
    MERCHANT_KEY : '42aYcP3raN#xqI!O',
    CALLBACK_URL:'https://pguat.paytm.com/oltp-web/processTransaction'
  }
};
