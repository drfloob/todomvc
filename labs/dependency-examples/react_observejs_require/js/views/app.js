/** @jsx React.DOM */

define(['react', 'jsx!views/main', 'jsx!views/footer'], function(React, UIMain, UIFooter) {

    var ENTER_KEY = 13;

    var UIApp = React.createClass({
        
        render: function() {

            return ( 
                <div>
		    <header id="header">
		    <h1>todos</h1>
		    <input id="new-todo" ref="newTodo" placeholder="What needs to be done?" autoFocus="true" onKeyPress={this.handleNewTodoKeypress} />
		    </header>

                    <UIMain todos={this.props.todos} />

                    <UIFooter todos={this.props.todos} />

                    </div>
            );
        },

        componentDidMount: function() {
            var self = this;

            Object.observe(self.props.todos, function(event) {
                console.log('updating app', event);
                self.setState();
            });
        },
        
        handleNewTodoKeypress: function(event) {
            if (event.keyCode != ENTER_KEY) {
                return;
            }

            var node = this.refs.newTodo.getDOMNode();
            var name = node.value.trim();
            if (name == "") {
                return;
            }

            this.props.todos.addItem(name);
            node.value = "";
        }

    });

    return UIApp;
    
});