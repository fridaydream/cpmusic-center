const mongoose = require('mongoose')
const Category = mongoose.model('Category')

exports.getAllCategorys = async () => {
  const query = {}
  // 对最新的进行排序
  const categorys = await Category.find(query).sort({'meta.updatedAt': -1})
  return categorys
}

exports.updateCategoryMusic = async (categoryId, musicId) => {
  const category = await Category.findOne({ _id: categoryId })
  if (category.music.indexOf(musicId) === -1) {
    category.music.push(musicId)
  }
  await category.save()
  return true
}
