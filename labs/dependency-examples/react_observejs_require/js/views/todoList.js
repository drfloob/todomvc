/** @jsx React.DOM */
define(['react', 'jsx!views/todo', 'router'], function(React, UITodo, router) {
    var UITodoList = React.createClass({
        render: function() {
            console.log('todoList rendering');

            var lis = this.props.shownTodos.map(function(t) { 
                return ( <UITodo key={t.id} todo={t} /> );
            });

            return (
		    <ul id="todo-list">
                    {lis}
		</ul>
            );
        },

        getDefaultProps: function() {
            return {shownTodos: this.props.todos};
        },

        filterTodos: function(props) {
            var shownTodos;
            if (props.filter === router.ALL) {
                shownTodos = props.todos;
            } else if (props.filter === router.ACTIVE) {
                shownTodos = props.todos.getActive();
            } else if (props.filter === router.COMPLETED) {
                shownTodos = props.todos.getCompleted();
            }
            props.shownTodos = shownTodos;
        },

        componentWillMount: function() {
            this.filterTodos(this.props);
        },

        componentWillUpdate: function(nextProps) {
            this.filterTodos(nextProps);
        }

    });
    return UITodoList;
});