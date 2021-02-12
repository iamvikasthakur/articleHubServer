const Mongoose = require("mongoose")

const userSchema = new Mongoose.Schema({
  name : {
      type: String,
      required: true
  },
  email : {
      type : String,
      required: true
  },
  photoUrl : {
      type : String, 
      required : true
  },
  accessToken : {
      type: String,
      required : true
  },
  likedArticleId : [{
      type : String,
  }],
  dislikedArticleId : [{
      type : String,
  }],
  date : {
      type : String,
      default : Date.now
  }
});

const User = Mongoose.model("User", userSchema);

module.exports = User;