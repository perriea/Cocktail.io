// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
    'twitterAuth' : {
        'consumerKey'       : 'blabla',
        'consumerSecret'    : 'blabla',
        'callbackURL'       : 'blabla'
    },

    'googleAuth' : {
        'clientID'      : '662568050796-o70r0o9a9h5407s711crcmdrou79arv0.apps.googleusercontent.com',
        'clientSecret'  : 'g38kWCEDaPOUqpZhAL7Kmt5q',
        'callbackURL'   : 'http://localhost:3000/api/auth/google/callback'
    }
};