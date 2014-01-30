/** @jsx React.DOM */
define(['react', 'jsx!views/todo'], function(React, UITodo) {
    var UITodoList = React.createClass({
        render: function() {
            var lis = this.props.todos.map(function(t){return <UITodo todo={t} key={t.id} />});

            return (
		    <ul id="todo-list">
                    {lis}
		</ul>
            );
        },

    });
    return UITodoList;
});