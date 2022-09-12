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

  type SolutionsType {
    id: String
    solution: String
  }

  type SolutionsList {
    lang: String
    solutions: [SolutionsType]
  }

  type Task {
    _id: ID
    created: String
    taskSlug: String
    title: String
    text: String
    solutionsList: [SolutionsList]
    imgUrl: String
    imgAuthor: String
  }

  input Solutions {
    id: String
    solution: String
  }

  input SolutionsInput {
    lang: String
    solutions: [Solutions]
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

  input TaskInput {
    title: String
    taskSlug: String
    text: String
    solutionsList: [SolutionsInput]
    imgUrl: String
    imgAuthor: String
  }

  input TaskUpdateInput {
    title: String
    text: String
    solutionsList: [SolutionsInput]
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