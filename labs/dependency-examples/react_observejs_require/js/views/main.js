/** @jsx React.DOM */

define(['react', 'jsx!views/todoList'], function(React, UITodoList) {

    var UIMain = React.createClass({
        
        render: function() {

            var count = this.props.todos.length;

            var sStyle = {visibility: count > 0 ? 'visible' : 'hidden'};

            return ( 

		    <section style={sStyle} id="main">
		    <input id="toggle-all" type="checkbox" />
		    <label htmlFor="toggle-all">Mark all as complete</label>

                    <UITodoList todos={this.props.todos} />

		    </section>

            );
        }

    });

    return UIMain;
    
});