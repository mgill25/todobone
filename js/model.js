// Create a namespace for the app.
var app = {};

// Create our basic Model
app.Todo = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  },

  toggle: function() {
    this.save({completed: !this.get('completed')});
  }
});

// now we create a Model collection
app.TodoList = Backbone.Collection.extend({
  model: app.Todo,
  localStorage: new Store('todolist-store')
});

// New instance of the Collection that we can use!
app.todoList = new app.TodoList();