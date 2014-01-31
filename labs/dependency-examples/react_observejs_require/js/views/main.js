/** @jsx React.DOM */

define(['react', 'jsx!views/todoList'], function(React, UITodoList) {

    var UIMain = React.createClass({
        
        render: function() {
            var count = this.props.todos.length;
            var sectionStyle = {visibility: count > 0 ? 'visible' : 'hidden'};

            return ( 

		    <section style={sectionStyle} id="main">
		    <input id="toggle-all" type="checkbox" checked={this.props.allChecked} onChange={this.toggleAll} />
		    <label htmlFor="toggle-all">Mark all as complete</label>

                    <UITodoList todos={this.props.todos} filter={this.props.filter} />

		    </section>

            );
        },

        toggleAll: function(event) {
            var complete = event.target.checked;
            this.props.todos.forEach(function(t){t.completed = complete});
        },

        componentWillMount: function() {
            this.watchTodos(this.props);
        },

        componentWillUpdate: function(nextProps) {
            this.unwatchTodos(this.props);
            this.watchTodos(nextProps);
        },

        componentWillUnmount: function() {
            this.unwatchTodos(this.props);
        },

        watchTodos: function(props) {
            var self = this;
            props.allChecked = props.todos.every(function(t) { return t.completed; });

            props.cb = function() {
                self.setState();
            };
            props.todos.forEach(function(t) {
                Object.observe(t, props.cb);
            });
        },

        unwatchTodos: function(props) {
            var self = this;
            props.todos.forEach(function(t) {
                Object.unobserve(t, props.cb);
            });
        }

    });

    return UIMain;
    
});