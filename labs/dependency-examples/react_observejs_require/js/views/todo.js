/** @jsx React.DOM */
define(['react', '../models/todos'], function(React, Todos) {
    var ENTER_KEY = 13;
    var ESCAPE_KEY = 27;

    var UITodo = React.createClass({
        render: function(){
            var cx = React.addons.classSet({
                'completed': this.props.todo.completed,
                'editing': this.state.editing
            });
            return (
                    <li ref="li" className={cx}>
		    <div className="view">
		    <input className="toggle" type="checkbox" checked={this.props.todo.completed} onChange={this.handleComplete} />
		    <label onDoubleClick={this.handleDoubleClick} >{this.props.todo.name}</label>
		    <button className="destroy" onClick={this.handleDestroy}></button>
		    </div>
		    <input 
                ref="edit" 
                className="edit" 
                value={this.state.name} 
                onChange={this.handleChangeEdit} 
                onKeyUp={this.handleEditKeypress} 
                onBlur={this.saveEdits}
                    />
                    </li>
            );
        },

        getInitialState: function(){
            return {editing: false, name: this.props.todo.name};
        },

        handleComplete: function() {
            console.log('completing', this.props.todo.name);
            this.props.todo.completed = !this.props.todo.completed;
        },

        handleDestroy: function() {
            console.log('destroying', this.props.todo.name);
            this.props.todo.delete();
        },

        handleDoubleClick: function() {
            console.log('handling double click');
            this.setState({editing: true});
        },

        handleChangeEdit: function(evt) {
            this.setState({name: evt.target.value});
        },

        handleEditKeypress: function(evt) {
            if (evt.keyCode == ESCAPE_KEY) {
                this.refs.edit.getDOMNode().value = this.props.todo.name;
                this.setState({editing: false, name: this.props.todo.name});
                return;
            }
            if (evt.keyCode != ENTER_KEY) {
                return;
            } 

            this.saveEdits();
        },

        saveEdits: function() {
            this.props.todo.name = this.refs.edit.getDOMNode().value.trim();
            if (this.props.todo.name === '') {
                this.props.todo.delete();
            };
            this.setState({editing: false});
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

        componentWillReceiveProps: function(nextProps) {
            console.log('will receive props', this.props.key, nextProps.key);

            Object.unobserve(this.props.todo, this.props.cb);

            var self = this;
            nextProps.cb = function(changes) {
                console.log('forceUpdating', self);
                self.forceUpdate();
            };
            Object.observe(nextProps.todo, nextProps.cb);

            self.setState({editing: false, name: nextProps.todo.name});
        },

        componentDidUpdate: function() {
            console.log('updated', this.props.todo.name);
            if (this.state.editing) {
                this.refs.edit.getDOMNode().focus();
                window.getSelection().collapseToEnd();
            }
        },



        componentWillUnmount: function() {
            console.log('unmounting', this.props.todo.name);
            Object.unobserve(this.props.todo, this.props.cb);
        },

        shouldComponentUpdate: function(nextProps) {
            console.log('shouldComponentUpdate: always true');
            return true;
        }

    });
    return UITodo;
});