import pkg from 'mongoose'

const { Schema, model } = pkg

const userSchema = new Schema({
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    createdAt: {type: String, require: true},
    approved: {type: Boolean, default: false}
})

export default model('User', userSchema)