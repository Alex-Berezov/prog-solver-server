import Task from "../../models/Task.js"


const root = {
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
  getTsak: async ({ taskSlug }) => {
    try {
      const taskFetched = await Task.findOne({taskSlug})
      return taskFetched
    } catch (error) {
      console.log('Get single task error on server >>', error)
    }
  },
  addTask: async ({ input }) => {
    try {
      const {
        taskId, title, text, languages, solutionsList: [lang, solutions], imgUrl, imgAuthor, likes
      } = input
      const taskSlug = title.toLowerCase().split(' ').join('-')

      const taskFetched = await Task.findOne({taskSlug}) // Разобраться, как возвращать ошибку по правильному
      if (taskFetched) return console.log('Task already exist')

      const task = new Task({ taskId, title, text, languages, solutionsList: [lang, solutions], imgUrl, imgAuthor, likes })
      const newTask = await task.save()
      return { ...newTask._doc, taskSlug: newTask.taskSlug }
    } catch (error) {
      console.log('Add task error on server >>', error)
    }
  },
  deletePost: async ({ taskSlug }) => {
    try {
      const deletedTask = await task.findByIdAndDelete(taskSlug);
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
