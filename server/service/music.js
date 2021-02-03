const mongoose = require('mongoose')
const Music = mongoose.model('Music')

exports.findAndRemove = async (id) => {
  const music = await Music.findOne({_id: id})
  if (music) {
    await music.remove()
  }
}

exports.getAllMusics = async () => {
  const query = {}
  // // 对最新的进行排序
  // exports.getAllUser = async () => {
  //   const result = await User.find({}).populate('music').populate('category').exec()
  //   return result
  // }
  const musics = await Music.find(query).populate('user').populate('category').exec()
  return musics
}

exports.getMovieDetail = async (id) => {
  const music = await Music.findOne({_id: id})
  return music
}

exports.createMusic = async ({ url, cover, author, name, category, user }) => {
  const music = new Music({
    url,
    cover,
    author,
    name,
    user,
    category
  })
  const result = await music.save()
  return result
}

exports.updateMusicById = async (data) => {
  const music = await Music.findOneAndUpdate(
    {_id: data.id},
    {
      $set: {
        data
      }
    }
  );
  return music
}
