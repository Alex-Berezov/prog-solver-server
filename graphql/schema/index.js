import { buildSchema } from 'graphql'

const schema = buildSchema(`
  type User {
    id: ID!
    email: String!
    password: String!
    token: String
    createdAt: String!
    approved: Boolean
  }

  type Auth {
    approved: Boolean
  }

  type Solutions {
    lang: String
    solutions: [String]
  }

  type Task {
    _id: ID
    created: String
    taskId: String
    taskSlug: String
    title: String
    text: String
    languages: [String]
    solutionsList: [Solutions!]
    imgUrl: String
    imgAuthor: String
    likes: Int
  }

  input RegistrationInput {
    email: String!
    password: String!
    confirmPassword: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input AuthInput {
    email: String!
    token: String!
  }

  input SolutionsInput {
    lang: String
    solutions: [String]
  }

  input TaskInput {
    taskId: String
    title: String
    taskSlug: String
    text: String
    languages: [String]
    solutionsList: [SolutionsInput!]
    imgUrl: String
    imgAuthor: String
    likes: Int
  }

  input TaskUpdateInput {
    title: String
    text: String
    languages: [String]
    solutionsList: [SolutionsInput!]
    imgUrl: String
    imgAuthor: String
  }

  type Mutation {
    registration (input: RegistrationInput): User!
    login (input: LoginInput): User!
    auth (input: AuthInput): Auth!
    addTask(input: TaskInput): Task,
    updateTask(taskSlug: String, input: TaskUpdateInput): Task,
    deleteTask(taskSlug: String): Task,
  }

  type Query {
    getAllTasks: [Task!]
    getTask(taskSlug: String): Task
  }
`)

export default schema