
Vue.http.options.emulateJSON = true; // web server can't handle requests encoded as application/json
new Vue({
  el: '#taskApp',
  data: {
    nameApp: 'TODO App',
    tasks: [{
      id: Math.random().toString(36).substring(2),
      title: 'Default task 1',
      comment: 'comment1',
      done: false
    }]
  },
  methods: {
    deleteTask: function(task) {
      this.tasks.splice(this.tasks.indexOf(task), 1);
    },
    addTask: function(e) {
      e.preventDefault();
      if (this.tasks.title != undefined && this.tasks.title != '') {
        // If not task id, generate a new ID
        let id = (this.tasks.id == undefined || this.tasks.id == '') ? Math.random().toString(36).substring(2) : this.tasks.id;

        this.tasks.push({
          id,
          title: this.tasks.title,
          comment: this.tasks.comment,
          done: false
        });

        // Reset form fields
        this.tasks.title = '';
        this.tasks.comment = '';
        this.tasks.id = '';

        this.registerTask(this.tasks[this.tasks.length -1]);
      }
    },
    updateTask: function(task) {
      // Get task to edit
      let current_task = this.tasks[this.tasks.indexOf(task)];

      // Fill form fields
      this.tasks.title = current_task.title;
      this.tasks.comment = current_task.comment;
      this.tasks.id = current_task.id;

      this.deleteTask(task); // Delete task from list
    },
    registerTask: function(task) {
      console.log("Registrando...");
      this.$http.post('todos/registerTask', {id: task.id, title: task.title, comment: task.comment})
        .then(response => console.log(response))
        .catch(console.log);
    }
  }
});
