/** @jsx React.DOM */
define(['react', 'underscore', 'jsx!views/todo', 'router'], function(React, _, Todo, router) {

    var TodoList = React.createClass({
        render: function() {
            var lis = this.props.shownTodos.map(function(t) { 
                return ( <Todo key={t.__id} todo={t} /> );
            });

            return (
		    <ul id="todo-list">
                    {lis}
		</ul>
            );
        },

        getDefaultProps: function() {
            return {shownTodos: this.props.model.root().children()};
        },

        filterTodos: function(props) {
            var shownTodos;
            if (props.filter === router.ALL) {
                shownTodos = props.model.root().children();
            } else if (props.filter === router.ACTIVE) {
                shownTodos = _.filter(props.model.root().children(), function(k) { return !k.data().completed; });
            } else if (props.filter === router.COMPLETED) {
                shownTodos = _.filter(props.model.root().children(), function(k) { return k.data().completed; });
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
    return TodoList;
});