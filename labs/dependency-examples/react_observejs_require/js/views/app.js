/** @jsx React.DOM */

define(['react', 'jsx!views/main', 'jsx!views/footer', 'router'], function(React, UIMain, UIFooter, router) {

    var ENTER_KEY = 13;

    var UIApp = React.createClass({
        
        render: function() {

            return ( 
                <div>
		    <header id="header">
		    <h1>todos</h1>
		    <input id="new-todo" ref="newTodo" placeholder="What needs to be done?" autoFocus="true" onKeyPress={this.handleNewTodoKeypress} />
		    </header>

                    <UIMain todos={this.props.todos} filter={this.state.filter} />

                    <UIFooter todos={this.props.todos} filter={this.state.filter} />

                    </div>
            );
        },

        getInitialState: function() {
            return {filter: router.ALL};
        },

        componentDidMount: function() {
            var self = this;

            // force update on todos list-specific changes
            Object.observe(self.props.todos, function(event) {
                self.setState();
            });

            // set filter state and update on route change
            var setFilter = function(route) { 
                return function() {
                    console.log('setting filter', route);
                    self.setState({filter: route}); 
                }; 
            };
            ([router.ALL, router.ACTIVE, router.COMPLETED]).forEach(function(route) { 
                router.on(route, setFilter(route));
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