/** @jsx React.DOM */

define(['react', 'underscore', 'jsx!views/todoList'], function(React, _, TodoList) {

    var Main = React.createClass({

        render: function() {
            var count = this.props.model.root().children().length;
            var sectionStyle = {visibility: count > 0 ? 'visible' : 'hidden'};

            return ( 

		    <section style={sectionStyle} id="main">
		    <input id="toggle-all" type="checkbox" checked={this.props.allChecked} onChange={this.toggleAll} />
		    <label htmlFor="toggle-all">Mark all as complete</label>

                    <TodoList model={this.props.model} filter={this.props.filter} />

		    </section>

            );
        },

        componentWillMount: function() {
            this.updateAllChecked(this.props);
        },
        componentWillUpdate: function(nextProps) {
            this.updateAllChecked(nextProps);
        },


        updateAllChecked: function(props) {
            // console.log('props is', props);
            props.allChecked = _.every(props.model.root().children(), function(k) { return k.data().completed });
        },

        toggleAll: function(event) {
            var complete = event.target.checked;
            var tree = this.props.model;
            _.each(this.props.model.root().children(), function(t){
                t = tree.findNode(t);
                tree = t.update({completed: complete});
            });
        }


    });

    return Main;
    
});