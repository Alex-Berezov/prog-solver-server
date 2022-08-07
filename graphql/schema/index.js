import { buildSchema } from 'graphql'

const schema = buildSchema(`
  type Task {
    _id: ID
    taskId: String
    taskSlug: String
    title: String
    text: String
    languages: [String]
    solutions: [String]
    imgUrl: String
    imgAuthor: String
    likes: Int
  }
  input TaskInput {
    taskId: String
    title: String
    text: String
    languages: [String]
    solutions: [String]
    imgUrl: String
    imgAuthor: String
    likes: Int
  }
  type Mutation {
    addTask(input: TaskInput): Task,
    deleteTask(taskSlug: String): Task,
  }
  type Query {
    getAllTasks: [Task!]
    getTask(taskSlug: String): Task
  }
`)

export default schema