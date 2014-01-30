// Routes are hash maps that match URL patterns to functions.

// we use routes to filter b/w pending and complete tasks
app.Router = Backbone.Router.extend({
    routes: {
        '*filter': 'setFilter'
    },

    setFilter: function(params) {
        console.log('[app.router.params]: ', params);
        window.filter = params.trim() || '';
        app.todoList.trigger('reset');
    }
});

