/** @jsx React.DOM */

define(['react', 'jsx!views/todoList'], function(React, UITodoList) {

    var UIMain = React.createClass({
        
        render: function() {

            var count = this.props.todos.length;
            var sectionStyle = {visibility: count > 0 ? 'visible' : 'hidden'};

            return ( 

		    <section style={sectionStyle} id="main">
		    <input id="toggle-all" type="checkbox" onChange={this.toggleAll} />
		    <label htmlFor="toggle-all">Mark all as complete</label>

                    <UITodoList todos={this.props.todos} />

		    </section>

            );
        },

        toggleAll: function(event) {
            var complete = event.target.checked;
            this.props.todos.forEach(function(t){t.completed = complete});
        }

    });

    return UIMain;
    
});