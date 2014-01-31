/** @jsx React.DOM */

define(['react', 'jsx!views/todoList', 'mixins/propWatchAll'], function(React, UITodoList, PropWatchAll) {

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


        mixins: [PropWatchAll],
        propWatchAll_getLists: function(emit, props) {
            emit(props.todos);
        },
        propWatchAll_onWatch: function(props) {
            props.allChecked = props.todos.every(function(t) { return t.completed; });
        },
        
    });

    return UIMain;
    
});