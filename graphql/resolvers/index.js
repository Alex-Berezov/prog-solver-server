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
