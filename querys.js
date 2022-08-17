mutation {
  addTask (input: {
    taskId: "57fb09ef2b5314a8a98211ff"
    title: "New task",
    text: "Text for new task",
    languages: ["JS", "PHP", "Pyton"],
    solutionsList: [
      {
        lang: "JS",
        solutions: ["text1", "text2", "text3"]
      },
      {
        lang: "PHP",
        solutions: ["text1", "text2", "text3"]
      },
      {
        lang: "Pyton",
        solutions: ["text1", "text2", "text3"]
      }
    ],
    imgUrl: "https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    imgAuthor: "Some",
    likes: 42
  }) {
    _id, taskId, taskSlug, title, text, languages, solutionsList {
      lang
      solutions
    }, imgUrl, imgAuthor, likes
  }
}

mutation {
  deleteTask (taskSlug: "new-task") {
    _id taskId taskSlug title
  }
}

mutation {
  updateTask(taskSlug: "new-task", input: {
    title: "New task222",
    taskSlug: "new-task",
    text: "Text for new task222",
    languages: ["JS", "PHP", "Pyton"],
    solutionsList: [
      {
        lang: "JS",
        solutions: ["text1", "text2", "text3", "text4"]
      },
      {
        lang: "PHP",
        solutions: ["text1", "text2", "text3"]
      },
      {
        lang: "Pyton",
        solutions: ["text1", "text2", "text3"]
      }
    ],
    imgUrl: "https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    imgAuthor: "Some"
  }) {
    _id, taskId, taskSlug, title, text, languages, solutionsList {
      lang
      solutions
    }, imgUrl, imgAuthor, likes
  }
}

mutation  {
  registration(input: {
    email: "test@test.com",
    password: "12345",
    confirmPassword: "12345"
  }) {
    id, email, password, token
  }
}


query {
  getAllTasks {
    _id
    taskId
    taskSlug
    title
    text
    languages
    solutionsList {
      lang
      solutions
    }
    imgUrl
    imgAuthor
    likes
  }
}

query {
  getTask(taskSlug: "new-task-2") {
    title taskSlug languages
  }
}