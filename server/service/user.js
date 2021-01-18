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
