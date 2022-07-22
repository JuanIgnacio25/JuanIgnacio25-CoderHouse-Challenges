const admin = require('firebase-admin');
const {firebase} = require('../../configFB');

admin.initializeApp({
    credential: admin.credential.cert(firebase.firebaseConfig),
    databaseURL: 'https://coder-house-back-end.firebaseio.com'
});

const db = admin.firestore();

class FirebaseContainer {
    constructor(db) {
      this.db = admin.firestore();
      this.collection = this.db.collection(db)
    }
  }
  module.exports = FirebaseContainer;