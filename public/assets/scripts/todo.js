
/**
 * Functions
 */
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
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
    console.log("Cargando datos desde el servidor")
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
    deleteTask: function(task) {
      this.tasks.splice(this.tasks.indexOf(task), 1)
    },
    addTask: function(e) {
      e.preventDefault()
      if (this.tasks.title != undefined && this.tasks.title != '') {
        // If not task id, generate a new ID
        let id = (this.tasks.id == undefined || this.tasks.id == '') ? uuidv4() : this.tasks.id

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

        this.registerTask(task)
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

      this.deleteTask(task); // Delete task from list
    },
    registerTask: function(task) {
      console.log("Registrando...")
      this.$http.post('todos/registerTask', {id: task.id, title: task.title, comment: task.comment})
        .then(response => {
          console.log(response)

        })
        .catch(console.log)
    }
  }
})
