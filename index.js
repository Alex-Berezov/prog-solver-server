import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import root from './graphql/resolvers/index.js'
import schema from './graphql/schema/index.js'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 5000 

app.use(express.json())
app.use(cors())

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  rootValue: root,
  schema
}))

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    app.listen(PORT, () => {
      console.log('Listening on port: ' + PORT)
    })
  } catch (error) {
    console.log(error)
  }
}
start()