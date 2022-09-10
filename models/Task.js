import pkg from 'mongoose'

const { Schema, model } = pkg

const taskSchema = new Schema({
  created: {type: String, require: true},
  taskSlug: {type: String, require: true},
  title: {type: String, require: true},
  text: {type: String, require: true},
  solutionsList: {type: Array, require: true, ref: 'Solutions'},
  imgUrl: {type: String, require: true},
  imgAuthor: {type: String, require: true}
})

export default model('Task', taskSchema)