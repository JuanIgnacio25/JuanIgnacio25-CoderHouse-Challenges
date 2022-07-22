const firebaseContainer = require('../containers/containerFireBase');
const norm = require('normalizr');

const normalizr = require ("normalizr");

const authorSchema = new normalizr.schema.Entity("authors",{},{idAttribute:"email"})
const messageSchema = new normalizr.schema.Entity("messages",{
    author:authorSchema
})
const messagesListSchema = new normalizr.schema.Entity("messagesList",{
    messages: [messageSchema]
})

class DaoFirebaseMessages extends firebaseContainer {

    static idCounter = 0;
  
    constructor() {
      super("messages");
    }
  
    async save(message) {
      message.id = DaoFirebaseMessages.idCounter;
      const messageToAdd = this.collection.doc(`${DaoFirebaseMessages.idCounter}`);
      await messageToAdd.create(message)
    }
  
    async getAll(){
      let allMessages = [];
      const collect = await this.collection.get();
      collect.forEach( doc => {
        allMessages.push(doc.data());
        if(DaoFirebaseMessages.idCounter <= doc.data().id){
        DaoFirebaseMessages.idCounter= doc.data().id +1;
        }
      }
      )
      return allMessages;
    }
  
    async normalize(){
      const messages = await this.getAll();
      const messagesToNormalize = {
        id:1,
        messages:messages
      }
      const normalized = normalizr.normalize(messagesToNormalize, messagesListSchema)
      return normalized
    }
  }
  
  
    module.exports = DaoFirebaseMessages;