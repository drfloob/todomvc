define(['observe-shim', 'observe-utils'], function() {

    var nextId = 1;

    // Crockford's object
    function object(o) {
        function F() {};
        F.prototype = o;
        return new F();
    };


    // Class-like construction
    var TodoList = object(ObserveUtils.List());
    TodoList.addItem = function(name) {
        console.log('thisis', this);
        this.push(new TodoItem(name));
    }
    TodoList.getCompleted = function() {
        return this.filter(function(t) { return t.completed; });
    };

    TodoList.getActive =  function() {
        return this.filter(function(t) { return !t.completed; });
    };
       

    // The actual list
    var list = object(TodoList);

    // A list item. Note that it relies on `list` from the outer
    // scope.
    function TodoItem(name) {
        ObserveUtils.defineObservableProperties(this, 'id', 'name', 'completed');
        this.name = name;
        this.id = 'key' + nextId++;
        this.completed = false;
        this.deleted = false;

        this.delete = function() {
            list.splice(list.indexOf(this), 1);
            this.deleted = true;
        };
    };

    // TODO: remove test data
    list.addItem('bort');

    return list;
});