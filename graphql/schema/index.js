import { buildSchema } from 'graphql'

const schema = buildSchema(`
  type User {
    id: ID!
    email: String!
    token: String!
    createdAt: String!
  }

  type Solutions {
    lang: String
    solutions: [String]
  }

  type Task {
    _id: ID
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

  input RegisterInput {
    password: String!
    confirmPassword: String!
    email: String!
    approved: Boolean
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
    register (registerInput: RegisterInput): User!
    login (username: String!, password: String!): User!
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