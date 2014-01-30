/** @jsx React.DOM */
define(['react', 'jsx!views/todo'], function(React, UITodo) {
    var UITodoList = React.createClass({
        render: function() {
            // var lis = [];
            // for (var i in this.props.todos) {
            //     lis.push(<UITodo todo={this.props.todos[i]} />);
            // }
            var lis = this.props.todos.map(function(t){return <UITodo todo={t} />});

            return (
		    <ul id="todo-list">
                    {lis}
		</ul>
            );
        },

    });
    return UITodoList;
});