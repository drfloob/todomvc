define(['observe-shim', 'observe-utils'], function() {

    var nextId = 1;

    var TodoList = ObserveUtils.List();
    TodoList.addItem = function(name) {
        this.push(new TodoItem(name));
    };

    function TodoItem(name) {
        ObserveUtils.defineObservableProperties(this, 'id', 'name', 'completed');
        this.name = name;
        this.id = nextId++;
        this.completed = false;

        this.delete = function() {
            TodoList.splice(TodoList.indexOf(this), 1);
        };
    };

    TodoList.addItem('bort');

    return TodoList;
});