import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import root from './graphql/resolvers/index.js';
import schema from './graphql/schema/index.js';

const app = express()
const PORT = process.env.PORT || 5000 

const dbConnect = 'mongodb+srv://aleber:vNSs2hrE0CpASpFe@cluster0.o1pzeuc.mongodb.net/prog-solver?retryWrites=true&w=majority'

app.use(express.json())
app.use(cors())

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  rootValue: root,
  schema
}))


const start = async () => {
  try {
    await mongoose.connect(dbConnect)

    app.listen(PORT, () => {
      console.log('Listening on port:' + PORT)
    })
  } catch (error) {
    console.log(error)
  }
}
start()