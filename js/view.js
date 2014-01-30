// Views

app.TodoView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#item-template').html()),

  events: {
    'dblclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'blur .edit': 'close',
    'click .toggle': 'toggleCompleted',
    'click .destroy': 'destroy'
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.input = this.$('.edit');
    return this;
  },

  initialize: function() {
    this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this);
  },

  edit: function() {
    this.$el.addClass('editing');
    this.input.focus();
  },

  close: function() {
    var value = this.input.val().trim();
    if (value) {
      this.model.save({title: value});
    }
    this.$el.removeClass('editing');
  },

  updateOnEnter: function(e) {
    if (e.which == 13) {
      this.close();
    }
  },

  toggleCompleted: function() {
    this.model.toggle();
  },

  destroy: function() {
    this.model.destroy();
  }
});

// Another view that can take a collection and render individual items
app.AppView = Backbone.View.extend({
  el: '#todoapp',

  events: {
    'keypress #new-todo': 'createToDoOnEnter'
  },

  createToDoOnEnter: function(e) {
    if (e.which !== 13 || !this.input.val().trim() ) {
      return;
    }
    app.todoList.create(this.newAttributes());
    this.input.val('');         // clean input box
  },

  initialize: function() {
    this.input = this.$('#new-todo');
    app.todoList.on('add', this.addOne, this);
    app.todoList.on('reset', this.addAll, this);
    app.todoList.fetch();                         // loads from local storage
  },

  addOne: function(todo) {
    var view = new app.TodoView({model: todo});
    this.$('#todo-list').append(view.render().el);
  },

  addAll: function() {
    this.$('#todo-list').html();
    app.todoList.each(this.addOne, this);
  },

  newAttributes: function() {
    return {
      title: this.input.val().trim(),
      completed: false
    };
  }
});

app.appView = new app.AppView();

