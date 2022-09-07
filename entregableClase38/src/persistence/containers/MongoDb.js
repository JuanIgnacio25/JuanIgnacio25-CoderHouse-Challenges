const mongoose = require("mongoose");

class MongoDbContainer {
  static idCounter = 1;

  constructor(collection, prodSchema) {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Conectado a DB de mongo");
    this.collection = mongoose.model(collection, prodSchema);
  }
}

module.exports = MongoDbContainer;