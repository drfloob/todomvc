/** @jsx React.DOM */
define(['react', '../models/todos'], function(React, Todos) {
    var UITodo = React.createClass({
        render: function(){
            var cx = React.addons.classSet({'completed': this.props.todo.completed});
            return (
                    <li className={cx}>
		    <div className="view">
		    <input className="toggle" type="checkbox" checked={this.props.todo.completed} onChange={this.handleComplete} />
		    <label>{this.props.todo.name}</label>
		    <button className="destroy" onClick={this.handleDestroy}></button>
		    </div>
		    <input className="edit" value={this.props.todo.name} />
                    </li>
            );
        },

        handleComplete: function() {
            this.props.todo.completed = !this.props.todo.completed;
        },

        handleDestroy: function() {
            this.props.todo.delete();
        },

        componentWillMount: function() {
            var self = this;
            Object.observe(this.props.todo, function(changes) {
                self.forceUpdate();
            });
        },

        shouldComponentUpdate: function(nextProps) {
            console.log('shouldComponentUpdate');
            return false;
        }

    });
    return UITodo;
});