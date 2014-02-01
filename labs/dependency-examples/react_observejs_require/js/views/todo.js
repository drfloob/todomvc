/** @jsx React.DOM */
define(['react', '../models/todos', 'mixins/inputWatcher'], function(React, Todos, InputWatcher) {
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
                onKeyUp={this.inputWatcher.makeForRef('edit', this)} 
                onBlur={this.saveEdits}
                    />
                    </li>
            );
        },

        mixins: [Object.observe.react.watch, InputWatcher],
        observe: {
            which: function(emit, props) {
                emit(props.todo);
            }
        },


        //--------------------------------------------------------------------------------
        // CALLBACKS

        handleComplete: function() {
            this.props.todo.completed = !this.props.todo.completed;
        },

        handleDestroy: function() {
            this.props.todo.delete();
        },

        handleDoubleClick: function() {
            this.setState({editing: true});
        },

        handleChangeEdit: function(evt) {
            this.setState({name: evt.target.value});
        },


        // InputWatcher Callbacks
        // All assumed for this.refs.edit
        onEscape: function(refName, ref) {
            console.log('in onEscape', this);
            ref.getDOMNode().value = this.props.todo.name;
            this.setState({editing: false, name: this.props.todo.name});
        },

        onEnter: function(refName, ref) {
            this.saveEdits();
        },

        //--------------------------------------------------------------------------------
        // INTERNAL FUNCTIONS

        saveEdits: function() {
            this.props.todo.name = this.refs.edit.getDOMNode().value.trim();
            if (this.props.todo.name === '') {
                this.props.todo.delete();
            };
            this.setState({editing: false});
        },



        //--------------------------------------------------------------------------------
        // COMPONENT LIFECYCLE METHODS

        getInitialState: function(){
            return {editing: false, name: this.props.todo.name};
        },

        componentWillReceiveProps: function(nextProps) {
            this.setState({editing: false, name: nextProps.todo.name});
        },

        componentDidUpdate: function() {
            if (this.state.editing) {
                this.refs.edit.getDOMNode().focus();
                window.getSelection().collapseToEnd();
            }
        }


    });
    return UITodo;
});