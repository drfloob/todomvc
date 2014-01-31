/** @jsx React.DOM */
define(['react', 'jsx!views/todo'], function(React, UITodo) {
    var UITodoList = React.createClass({
        render: function() {
            console.log('todoList rendering');

            var lis = this.props.todos.map(function(t) { 
                return ( <UITodo key={t.id} todo={t} /> );
            });

            return (
		    <ul id="todo-list">
                    {lis}
		</ul>
            );
        },

    });
    return UITodoList;
});