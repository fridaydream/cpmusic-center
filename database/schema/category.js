const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ObjectId = Schema.Types.ObjectId

const categorySchema = new Schema({
  music: [{
    type: ObjectId,
    ref: 'Music'
  }],
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

categorySchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

mongoose.model('Category', categorySchema)
