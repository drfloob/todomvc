/** @jsx React.DOM */

define(['react', 'jsx!views/todoList', 'router'], function(React, UITodoList, router) {

    var UIMain = React.createClass({
        
        render: function() {
            console.log('main rendering');

            var count = this.props.todos.length;
            var sectionStyle = {visibility: count > 0 ? 'visible' : 'hidden'};

            return ( 

		    <section style={sectionStyle} id="main">
		    <input id="toggle-all" type="checkbox" checked={this.props.allChecked} onChange={this.toggleAll} />
		    <label htmlFor="toggle-all">Mark all as complete</label>

                    <UITodoList todos={this.props.shownTodos} />

		    </section>

            );
        },

        getDefaultProps: function() {
            return {shownTodos: this.props.todos};
        },

        toggleAll: function(event) {
            var complete = event.target.checked;
            this.props.shownTodos.forEach(function(t){t.completed = complete});
        },

        componentWillMount: function() {
            this.filterTodos(this, this.props);
            this.watchTodos(this, this.props);
        },

        componentWillUpdate: function(nextProps) {
            console.log('main willUpdate');
            this.unwatchTodos(this, this.props);
            this.filterTodos(this, nextProps);
            this.watchTodos(this, nextProps);
        },

        componentWillUnmount: function() {
            this.unwatchTodos(this, this.props);
        },


        filterTodos: function(self, props) {
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

        watchTodos: function(self, props) {
            console.log('main watchTodos');
            props.allChecked = props.shownTodos.every(function(t) { return t.completed; });

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