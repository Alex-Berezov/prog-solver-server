import Task from "../../models/Task.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { UserInputError } from 'apollo-server'
import 'dotenv/config'

import { validateRegisterInput, validateLoginInput } from '../../utils/Validators.js'

const generateToken = (user) => {
  return jwt.sign({
    _id: user._id,
    email: user.email
  }, process.env.SECRET, { expiresIn: '1h'})
}

const root = {
  register: async (_, { registerInput: { email, password, confirmPassword } }) => {
    try {
      // req data validation
      const { valid, errors } = validateRegisterInput(email, password, confirmPassword)
      if (!valid) {
          throw new UserInputError('Errors' , { errors })
      }
      
      // validation for unique email address
      const existedEmail = await User.findOne({ email })
      if (existedEmail) {
          throw new UserInputError('Email is taken',  {
              errors: {
                  email: 'This email is already taken'
              }
          })
      }

      password = await bcrypt.hash(password, 12)
      const newUser = new User ({
          email,
          password,
          createdAt: new Date().toISOString()
      })
      const result = await newUser.save()
      const token = generateToken(result)

      return {
          ...result._doc,
          id: result._id,
          token
      }
    } catch (error) {
      throw new UserInputError('Registration error', { error })
    }
  },
  login: async (_, { email, password }) => {
    try {
      const { valid, errors } = validateLoginInput(email, password)
      if (!valid) {
          throw new UserInputError('Errors' , { errors })
      }
      
      // getting a user from mongodb
      const user = await User.findOne({ email })
      if (!user) {
          errors.general = "User not found"
          throw new UserInputError('User not found', { errors })
      }

      // password match
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
          errors.general = "Wrong credentials."
          throw new UserInputError('Wrong credentials.', { errors })
      }

      // sending a token back
      const token = generateToken(user)

      return {
          ...user._doc,
          id: user._id,
          token
      }
    } catch (error) {
      throw new UserInputError('Login error', { error })
    }
  },
  getAllTasks: async () => {
    try {
      const tasksFetched = await Task.find()
      return tasksFetched.map(task => {
        return {
          ...task._doc,
          taskSlug: task.taskSlug
        }
      })
    } catch (error) {
      console.log('Get tasks error on server >>', error)
    }
  },
  getTask: async ({ taskSlug }) => {
    try {
      const taskFetched = await Task.findOne({taskSlug})
      return taskFetched
    } catch (error) {
      console.log('Get single task error on server >>', error)
    }
  },
  addTask: async ({ input }) => {
    try {
      const taskSlug = input.title.toLowerCase().split(' ').join('-')
      const taskFetched = await Task.findOne({taskSlug}) // Разобраться, как возвращать ошибку по правильному
      if (taskFetched) throw 'Task already exist!'

      const task = new Task({ ...input, taskSlug })
      const newTask = await task.save()
      return { ...newTask._doc, taskSlug: newTask.taskSlug }
    } catch (error) {
      console.log('Add task error on server >>', error)
    }
  },
  updateTask: async ({ taskSlug, input }) => {
    try {
      const updatedTaskSlug = input.title.toLowerCase().split(' ').join('-')
      const taskFetched = await Task.findOne({taskSlug: updatedTaskSlug})
      if (taskFetched) throw 'Task already exist!'

      const updatedTask = new Task({ ...input, taskSlug: updatedTaskSlug })
      await Task.findOneAndUpdate(taskSlug, { ...input, taskSlug: updatedTaskSlug })
      return { ...updatedTask._doc, taskSlug: updatedTask.taskSlug }
    } catch (error) {
      console.log('Update task error on server >>', error)
    }
  },
  deleteTask: async ({ taskSlug }) => {
    try {
      const deletedTask = await Task.findOneAndDelete({taskSlug})
      return {
        ...deletedTask._doc,
        taskSlug: deletedTask.taskSlug,
      }
    } catch (error) {
      console.log('Delete task error on server >>', error)
    }
  },
}

export default root
