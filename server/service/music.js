const mongoose = require('mongoose')
const Music = mongoose.model('Music')

export const findAndRemove = async (id) => {
  const music = await Music.findOne({_id: id})
  if (music) {
    await music.remove()
  }
}

export const getAllMusics = async () => {
  const query = {}
  // 对最新的进行排序
  const musics = await Music.find(query).sort({'meta.updatedAt': -1})
  return musics
}

export const getMovieDetail = async (id) => {
  const music = await Music.findOne({_id: id})
  return music
}

export const createMusic = async ({ url, cover, author, name }) => {
  const music = new Music({
    url,
    cover,
    author,
    name,
  })
  await music.save()
  return true
}

export const updateMusicById = async (data) => {
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
