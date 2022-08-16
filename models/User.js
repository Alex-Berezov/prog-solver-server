import pkg from 'mongoose'

const { Schema, model } = pkg

const userSchema = new Schema({
    email: {type: String, require: true},
    password: {type: String, require: true},
    createdAt: {type: String, require: true},
    approved: {type: Boolean, default: false}
})

export default model('User', userSchema)