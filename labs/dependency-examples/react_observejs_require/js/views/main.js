/** @jsx React.DOM */

define(['react', 'jsx!views/todoList'], function(React, UITodoList) {

    var UIMain = React.createClass({
        
        render: function() {

            var count = this.props.todos.length;
            var sectionStyle = {visibility: count > 0 ? 'visible' : 'hidden'};
            console.log('main rendering');

            return ( 

		    <section style={sectionStyle} id="main">
		    <input id="toggle-all" type="checkbox" checked={this.props.allChecked} onChange={this.toggleAll} />
		    <label htmlFor="toggle-all">Mark all as complete</label>

                    <UITodoList todos={this.props.todos} />

		    </section>

            );
        },

        toggleAll: function(event) {
            var complete = event.target.checked;
            this.props.todos.forEach(function(t){t.completed = complete});
        },

        componentWillMount: function() {
            this.watchTodos(this, this.props);
        },

        componentWillUpdate: function(nextProps) {
            console.log('main willUpdate');
            this.unwatchTodos(this, this.props);
            this.watchTodos(this, nextProps);
        },

        componentWillUnmount: function() {
            this.unwatchTodos(this, this.props);
        },

        watchTodos: function(self, props) {
            console.log('main watchTodos');
            var all = props.todos.every(function(t) {
                return t.completed;
            });
            self.props.allChecked = all;

            props.cb = function() {
                console.log('main cb');
                self.setState();
            };
            props.todos.forEach(function(t) {
                Object.observe(t, props.cb);
            });
        },

        unwatchTodos: function(self, props) {
            props.todos.forEach(function(t) {
                Object.unobserve(t, props.cb);
            });
        }

    });

    return UIMain;
    
});