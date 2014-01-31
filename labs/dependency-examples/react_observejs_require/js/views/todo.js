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
            console.log('completing', this.props.todo.name);
            this.props.todo.completed = !this.props.todo.completed;
        },

        handleDestroy: function() {
            console.log('destroying', this.props.todo.name);
            this.props.todo.delete();
        },

        componentWillMount: function() {
            console.log('mounting', this.props.todo.name);
            var self = this;
            this.props.cb = function(changes) {
                console.log('forceUpdating', self);
                self.forceUpdate();
            };
            Object.observe(this.props.todo, this.props.cb);
        },

        componentWillUpdate: function(nextProps) {
            console.log('will update', this.props.key, nextProps.key);

            Object.unobserve(this.props.todo, this.props.cb);

            var self = this;
            nextProps.cb = function(changes) {
                console.log('forceUpdating', self);
                self.forceUpdate();
            };
            Object.observe(nextProps.todo, nextProps.cb);
        },

        componentDidUpdate: function() {
            console.log('updated', this.props.todo.name);
        },



        componentWillUnmount: function() {
            console.log('unmounting', this.props.todo.name);
            Object.unobserve(this.props.todo, this.props.cb);
        },

        shouldComponentUpdate: function(nextProps) {
            console.log('shouldComponentUpdate: always true');
            return true;
            // console.log('shouldComponentUpdate', this.props.todo.name, this.props.todo.deleted);
            // return this.props.todo.deleted;
        }

    });
    return UITodo;
});