define(['chinchilla', 'underscore'], function(chinchilla, _) {
    'use strict';
    // TODO: Put your main data structures here as static data. 

    var API = {
        TodoList: function() {
            var data = chinchilla.new();

            _.mixin(this, {
                getAll: function() {
                    return _.map(data.root().children(), function(k) { return new API.Todo(k); });
                },
                getCompleted: function () {
                    return _.map(
                        _.filter(
                            data.root().children(), 
                            function(k) { return k.data().completed; }
                        ),
                        function(k) { return new API.Todo(k); }
                    );
                },
                getActive: function () {
                    return _.map(
                        _.filter(
                            data.root().children(), 
                            function(k) { return !k.data().completed; }
                        ),
                        function(k) { return new API.Todo(k); }
                    );
                },
                clearCompleted: function() {
                    data.root().removeAll(this.getCompleted());
                },
                newTodo: function(name) {
                    data.add({name: name, completed: false});
                },
                onUpdate: function(cb) {
                    data.on('afterUpdate', function(newTree) {
                        data = newTree;
                        cb(this);
                    });
                },
            });
        },
        Todo: function(node){
            _.mixin(this, {
                isCompleted: function() {
                    return node.data().completed;
                },
                remove: function() {
                    node.remove();
                }
            });
        }
    };

    return new API.TodoList();
});


