define(['_tree', 'underscore'], function(_tree, _) {
    'use strict';
    // TODO: Put your main data structures here as static data. 
    var TodoList, Todo, inflateMethod, stored;

    TodoList = _tree.Tree.extend({
        getAll: function() {
            return this.root().children();
        },
        getCompleted: function () {
            return _.filter(
                this.root().children(), 
                function(k) { return k.isCompleted(); }
            );
        },
        getActive: function () {
            return _.filter(
                this.root().children(), 
                function(k) { return !k.isCompleted(); }
            );
        },
        clearCompleted: function() {
            this.root().removeAll(this.getCompleted());
        },
        newTodo: function(title) {
            this.root().parseAndAddChild({title: title, completed: false});
        },
        onUpdate: function(cb) {
            this.on('afterUpdate', function(newTree) {
                cb(newTree);
            });
        },
        areAllCompleted: function() {
            return _.every(this.root().children(), function(k) { return k.isCompleted(); });
        },
        serialize: function() {
            var ret = {todos: _.map(this.getAll(), function(k){ return k.data(); })};
            return ret;
        }
    });

    Todo = _tree.Node.extend({
        isCompleted: function() {
            return this.data().completed;
        },
        complete: function(complete) {
            complete = _.isUndefined(complete) ? true : complete;
            this.data(_.defaults({completed: complete}, this.data()));
        },
        toggleCompleted: function() {
            this.data(_.defaults({completed: !this.isCompleted()}, this.data()));
        },
        title: function(n) {
            if (_.isUndefined(n)) {
                return this.data().title;
            } else {
                this.data(_.defaults({title: n}, this.data()));
            }
        }
    });

    inflateMethod = function(obj) {
        if (_.has(obj, 'todos')) {
            this.setNode(new _tree.Node(this.tree, obj));
            this.children(obj.todos);
        } else {
            this.setNode(new Todo(this.tree, obj));
        }
    };
    

    stored = localStorage.getItem('todomvc-_tree');
    if (stored) {
        return _tree.inflate(JSON.parse(stored), inflateMethod, {inflate: inflateMethod, treeClass: TodoList});
    } else {
        return _tree.create({inflate: inflateMethod, treeClass: TodoList});
    }
});


