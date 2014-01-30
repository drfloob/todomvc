/** @jsx React.DOM */
define(['react', '../models/todos', 'observe-js'], function(React, Todos, Observer) {
    var UITodo = React.createClass({
        render: function(){
            var cx = React.addons.classSet({'completed': this.props.todo.completed});
            return (
                    <li className={cx} key={this.props.todo.id}>
		    <div className="view">
		    <input className="toggle" type="checkbox" checked={this.props.todo.completed} onChange={this.handleComplete} />
		    <label>{this.props.todo.todo}</label>
		    <button className="destroy" onClick={this.handleDestroy}></button>
		    </div>
		    <input className="edit" value={this.props.todo.todo} />
                    </li>
            );
        },

        handleComplete: function() {
            this.props.todo.completed = !this.props.todo.completed;
            // this.obs.deliver();
            Observer.Platform.performMicrotaskCheckpoint();
        },

        handleDestroy: function() {
            var idx = Todos.indexOf(this.props.todo);
            if (idx === -1) throw "Could not find TODO!";
            Todos.splice(idx, 1);
            // this.obs.deliver();
            Observer.Platform.performMicrotaskCheckpoint();
        },

        componentWillMount: function() {
            var self = this;
            self.doRender = false;
            self.obs = new Observer.ObjectObserver(self.props.todo);
            self.obs.open(function() {
                console.log('todo observer edit');
                self.doRender = true;
                self.forceUpdate();
            });
        },

        shouldComponentUpdate: function() {
            console.log('todo shouldComponentUpdate', this.doRender);
            return this.doRender;
        }

    });
    return UITodo;
});