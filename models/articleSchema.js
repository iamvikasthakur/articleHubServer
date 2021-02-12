const Mongoose = require("mongoose")

const articleSchema = new Mongoose.Schema({
  article: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  like: {
    type: Number,
    required: true,
  },
  dislike: {
      type: Number,
      required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  author: {
      type: String,
      required: true,
  }, 
  imageUrl: {
      type: String,
      required: true,
  }
});

const Economical = Mongoose.model("Economical", articleSchema)
const Technical = Mongoose.model("Technical", articleSchema)
const Sport = Mongoose.model("Sport", articleSchema)
const Science = Mongoose.model("Science", articleSchema)

const Article = {
    Economical : Economical,
    Technical : Technical,
    Sport : Sport,
    Science : Science
}

module.exports = Article;