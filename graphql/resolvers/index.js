import Task from "../../models/Task.js"
import User from '../../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { UserInputError } from 'apollo-server'
import 'dotenv/config'
import { validateRegisterInput, validateLoginInput, validateAuthInput } from '../../utils/Validators.js'

const secret = process.env.SECRET

const generateToken = (user) => {
  return jwt.sign({
    _id: user._id,
    email: user.email
  }, secret, { expiresIn: '30d'})
}

// Function for verifying JWT
const verifyJwt = (jwtToken, secret) => {
  return new Promise((resolve, reject) => {
      jwt.verify(jwtToken, secret, function(err, decoded) {
          if (err) {
              reject(err)
          } else {
              resolve(decoded)
          }
      })
  })
}

const root = {
  auth: async ({ input: { email, token } }) => {
    try {
      const { valid, errors } = validateAuthInput(email, token)
      if (!valid) {
          throw new UserInputError('Errors' , { errors })
      }
      
      // getting a user from mongodb
      const user = await User.findOne({ email })
      if (!user) {
          errors.general = "User not found"
          throw new UserInputError('User not found', { errors })
      }

      //verifying JWT
      const verified = await verifyJwt(token, secret)
      if (!verified) {
        errors.general = "Not verified."
        throw new UserInputError('Not verified.', { errors })
      }

      //approved
      const approved = user.approved
      if (!approved) {
        errors.general = "Not approved."
        throw new UserInputError('Not approved.', { errors })
      }

      return { approved }
    } catch (error) {
      throw new UserInputError('Auth error', { error })
    }
  },
  registration: async ({ input: { email, password, confirmPassword } }) => {
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
          createdAt: new Date().toISOString(),
          approved: false
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
  login: async ({ input: { email, password } }) => {
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

      //approved
      const approved = user.approved
      if (!approved) {
        errors.general = "Not approved."
        throw new UserInputError('Not approved.', { errors })
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
  getAllTasks: async (parent, args) => {
    try {
      const tasksFetched = await Task.find()

      const first = args.body.variables.first || 5
      const after = args.body.variables.after || ''
      const index = tasksFetched.findIndex(item => item._id == after)
      const offset = index + 1

      const tasks = tasksFetched.slice(0, offset + first)
      const lastTask = tasks[tasks.length - 1]

      return {
        pageInfo: {
          endCursor: lastTask._id,
          hasNextPage: offset + first < tasksFetched.length
        },
        edges: tasks.map(task => ({
          cursor: task._id,
          node: task
        }))
      }
    } catch (error) {
      throw new UserInputError('Get tasks error on server >>', { error })
    }
  },
  getTask: async ({ taskSlug }) => {
    try {
      const taskFetched = await Task.findOne({taskSlug})
      return taskFetched
    } catch (error) {
      throw new UserInputError('Get single task error on server >>', { error })
    }
  },
  addTask: async ({ input }) => {
    try {
      const taskSlug = input.title.toLowerCase().split(' ').join('-')
      const taskFetched = await Task.findOne({taskSlug}) // Разобраться, как возвращать ошибку по правильному
      if (taskFetched) throw 'Task already exist!'

      const date = new Date()
      const day = date.getDate() <= 9 ? `0${date.getDate()}` : `${date.getDate()}`
      const month = date.getMonth() <= 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
      const year = `${date.getFullYear()}`
      const created = `${day}.${month}.${year}`

      const task = new Task({ ...input, taskSlug, created })
      const newTask = await task.save()
      return { ...newTask._doc, taskSlug: newTask.taskSlug }
    } catch (error) {
      throw new UserInputError('Add task error on server >>', { error })
    }
  },
  updateTask: async ({ taskSlug, input }) => {
    try {
      const taskFetched = await Task.findOne({taskSlug})
      const updatedTask = await Task.findByIdAndUpdate(taskFetched._id, {...input})
      return { ...updatedTask._doc, taskSlug }
    } catch (error) {
      throw new UserInputError('Update task error on server >>', { error })
    }
  },
  deleteTask: async (id) => {
    try {
      const deletedTask = await Task.findByIdAndDelete(id.taskId)
      return {
        ...deletedTask._doc,
      }
    } catch (error) {
      throw new UserInputError('Delete task error on server >>', { error })
    }
  },
  searchTask: async ({ title }) => {
    try {
      const tasksFetched = await Task.find({ title: { $regex: title, $options: 'i' } })

      return {
        pageInfo: {
          endCursor: 0,
          hasNextPage: false
        },
        edges: tasksFetched.map(task => ({
          cursor: 0,
          node: task
        }))
      }
    } catch (error) {
      throw new UserInputError('Search task error on server >>', { error })
    }
  }
}

export default root
