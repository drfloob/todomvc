/** @jsx React.DOM */

define(['react', 'router', 'data/main', 'jsx!views/main', 'jsx!views/footer', 'mixins/timedRender'], function(React, router, data, Main, Footer, TimedRender) {
    'use strict';

    var ENTER_KEY = 13;

    var App = React.createClass({
        
        mixins: [TimedRender],
        
        render: function() {

            return ( 
                    <div>
		    <header id="header">
		    <h1>todos</h1>
		    <input id="new-todo" ref="newTodo" placeholder="What needs to be done?" autoFocus="true" onKeyPress={this.handleNewTodoKeypress} />
		    </header>

                    <Main model={this.props.model} filter={this.state.filter} />

                    <Footer model={this.props.model} filter={this.state.filter} />

                </div>
            );
        },

        getInitialState: function() {
            return {filter: router.ALL};
        },

        componentDidMount: function() {
            var self = this;

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
        
        handleNewTodoKeypress: function(event) {
            if (event.keyCode != ENTER_KEY) {
                return;
            }

            var node = this.refs.newTodo.getDOMNode();
            var name = node.value.trim();
            if (name == "") {
                return;
            }

            this.props.model.add({name: name});
            node.value = "";
        }

    });

    return App;
});