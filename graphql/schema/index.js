import { buildSchema } from 'graphql'

const schema = buildSchema(`
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
    solutionsList: [Solutions]
    imgUrl: String
    imgAuthor: String
    likes: Int
  }

  input SolutionsInput {
    lang: String
    solutions: [String]
  }

  input TaskInput {
    taskId: String
    title: String
    text: String
    languages: [String]
    solutionsList: [SolutionsInput]
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