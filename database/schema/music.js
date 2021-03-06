const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ObjectId = Schema.Types.ObjectId

const musicSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User'
  },
  category: [{
    type: ObjectId,
    ref: 'Category'
  }],
  url: {
    unique: true,
    required: true,
    type: String
  },
  cover: {
    required: true,
    type: String
  },
  author: {
    required: true,
    type: String
  },
  name: {
    required: true,
    unique: true,
    type: String
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

musicSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

mongoose.model('Music', musicSchema)
