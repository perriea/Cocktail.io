// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
    'twitterAuth' : {
        'consumerKey'       : 'IIBCRks7KKQmCd51pswR2pkaQ',
        'consumerSecret'    : 'mzkWsjKb6ydYAYPd718I3hXoORWTcAxlvv9tJufy87j1FNVdSE',
        'callbackURL'       : 'http://127.0.0.1:3000/api/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '662568050796-fdeb4pggmniuogu92mobdh08pjgfqsro.apps.googleusercontent.com',
        'clientSecret'  : 'gzG_OAcU4gefYESxH6vuE-tc',
        'callbackURL'   : 'http://localhost:3000/api/auth/google/callback'
    },

    'githubAuth' : {
        'clientID'      : '26c6f014b1c3d58d2ef1',
        'clientSecret'  : '822fe7c5cdf42e72b16920bcd528af64263b811e',
        'callbackURL'   : 'http://localhost:3000/api/auth/github/callback'
    }
};