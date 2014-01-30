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
  localStorage: new Store('todolist-store'),

  completed: function() {
    return this.filter(function(todo) {
        return todo.get('completed');
    });
  },

  remaining: function() {
    return this.without.apply(this, this.completed());
  }
});

// New instance of the Collection that we can use!
app.todoList = new app.TodoList();