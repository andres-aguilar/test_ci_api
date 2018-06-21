
/**
 * Functions
 */
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function showAlert(message, error=false) {
  let $message     = document.querySelector(".message")
  let $message_text = document.querySelector(".message-text")
  
  $message_text.innerHTML = message
  if (error) {
    $message.classList.add("error")
  } else {
    $message.classList.add("success")
  }

  $message.classList.remove("hide")

  setTimeout(function(){
    $message.classList.add("hide")
  }, 2000)
}

/**
 * Vue definitions
 */
Vue.http.options.emulateJSON = true // web server can't handle requests encoded as application/json
new Vue({
  el: '#taskApp',
  data: {
    nameApp: 'TODO App',
    tasks: []
  },
  beforeMount() {
    this.$http.get('todos/getAllTasks')
      .then(response => {
        let data = response.body

        data.forEach(element => {
          this.tasks.push({
            id: element.todo_id,
            title: element.todo_title,
            comment: element.todo_comment,
            done: (element.todo_done === '0') ? false : true
          })
        })
      })
      .catch(console.log)
  },
  methods: {
    deleteTask: function(task, update=false) {
      this.tasks.splice(this.tasks.indexOf(task), 1)

      if (!update) {
        task.done = true
        console.log(`${task.title} done!`)
        this.registerTask(task, false)
      }
    },
    addTask: function(e) {
      e.preventDefault()
      if (this.tasks.title != undefined && this.tasks.title != '') {
        let id
        let update = false
        // If not task id, generate a new ID
        if (this.tasks.id == undefined || this.tasks.id == '') {
          // Is a new task
          id =  uuidv4()
        } else {
          id = this.tasks.id
          update = true
        }
        

        let task = {
          id,
          title: this.tasks.title,
          comment: this.tasks.comment,
          done: false
        }
        
        // Reset form fields
        this.tasks.title = ''
        this.tasks.comment = ''
        this.tasks.id = ''

        if (update) {
          // Update task
          this.registerTask(task, false)
        } else {
          // Register new task
          this.registerTask(task)
        }
        this.tasks.push(task)
      }
    },
    updateTask: function(task) {
      // Get task to edit
      let current_task = this.tasks[this.tasks.indexOf(task)]

      // Fill form fields
      this.tasks.title = current_task.title
      this.tasks.comment = current_task.comment
      this.tasks.id = current_task.id


      this.deleteTask(task, true); // Delete task from list
    },
    registerTask: function(task, register=true) {
      let url = (register) ? 'todos/registerTask' : 'todos/updateTask'

      this.$http.post(url, {id: task.id, title: task.title, comment: task.comment, status: task.done})
        .then(response => {
          if (response.body.message == "OK") {
            if (register) {
              showAlert("Tarea agregada")
            } else {
              showAlert("Tarea actualizada")
            }
          } else {
            showAlert("No fue posible registrar la tarea", true)
          }
        })
        .catch((response) => {
          console.log(response)
          showAlert("No fue posible registrar la tarea", true)
        })
    }
  }
})
