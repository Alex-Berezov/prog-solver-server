import pkg from 'mongoose'

const { Schema, model } = pkg

const solutionsListSchema = new Schema({
  lang: {type: String, require: true},
  solutions: {type: Array, require: true, ref: 'Task'}
})

export default model('Solutions', solutionsListSchema)