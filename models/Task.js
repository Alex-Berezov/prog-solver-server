import pkg from 'mongoose'

const { Schema, model } = pkg

const taskSchema = new Schema({
  taskId: {type: String, require: true},
  taskSlug: {type: String, require: true},
  title: {type: String, require: true},
  text: {type: String, require: true},
  languages: {type: Array, require: true},
  solutions: {type: Array, require: true},
  imgUrl: {type: String, require: true},
  imgAuthor: {type: String, require: true},
  likes: {type: Number, require: true}
})

export default model('Task', taskSchema)