const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.checkPassword = async (email, password) => {
  let match = false
  const user = await User.findOne({ email })
  if (user) {
    // password 输入的密码
    match = await user.comparePassword(password, user.password)
  }
  return {
    match,
    user
  }
}

exports.getAllUser = async () => {
  const result = await User.find({}).populate('music').exec()
  console.log(result);
  return result
}

exports.updateUserMusic = async (userId, musicId) => {
  const user = await User.findOne({ _id: userId })
  if (user.music.indexOf(musicId) === -1) {
    user.music.push(musicId)
  }
  await user.save()
  return true
}

