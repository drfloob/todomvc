/** @jsx React.DOM */

define(['react', 'router', 'data/main', 'jsx!views/main', 'jsx!views/footer'], function(React, router, data, Main, Footer) {
    'use strict';

    var ENTER_KEY = 13;

    var App = React.createClass({
        
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


    // var Item = React.createClass({
    //     componentWillMount: function() {
    //         console.log('^ mounting', this.props.model.data());
    //         var model = this.props.model,
    //         f = _.partial(model.data() < 4 ? changeItem : removeItem, this);
    //         setTimeout(f, DELAY * Math.random());
    //     },
    //     componentWillUnmount: function() {
    //         console.log('$ unmounting', this.props.model.data());
    //     },
    //     componentWillUpdate:function () {
    //         console.log('  updating', this.props.model.data());
    //     },
    //     render: function() {
    //         return <li>{this.props.model.data()}</li>;
    //     }
    // });

    // var App = React.createClass({
    //     componentWillMount: function() {
    //         router.on(router.ON.ALL, function(){console.log('app found /');});
    //     },
    //     render: function() {
    //         return <ul>
    //             {this.props.model.root().children().map(function(t) {
    //                 return <Item key={t.data()} model={t} />;
    //             })}
    //         </ul>;
    //     }
    // });

    // return App;
});