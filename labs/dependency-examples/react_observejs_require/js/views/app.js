/** @jsx React.DOM */

define(['react', 'jsx!views/main', 'jsx!views/footer', 'router', 'mixins/inputWatcher'], function(React, UIMain, UIFooter, router, InputWatcher) {

    var UIApp = React.createClass({

        mixins: [InputWatcher],

        render: function() {

            return ( 
                <div>
		    <header id="header">
		    <h1>todos</h1>
		    <input id="new-todo" 
                ref="newTodo" 
                placeholder="What needs to be done?" 
                autoFocus="true" 
                onKeyUp={this.inputWatcher.makeForRef('newTodo', this)} />
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

            // force update on todo list-specific changes
            Object.observe(self.props.todos, function(event) {
                self.setState();
            });

            // set filter state and update on route change
            var setFilter = function(route) { 
                return function() {
                    self.setState({filter: route}); 
                }; 
            };
            ([router.ALL, router.ACTIVE, router.COMPLETED]).forEach(function(route) { 
                router.on(route, setFilter(route));
            });

        },
        
        onEnter: function(refName, ref) {
            // assuming newTodo ref
            var node = ref.getDOMNode();
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