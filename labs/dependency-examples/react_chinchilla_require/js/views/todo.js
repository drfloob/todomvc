/** @jsx React.DOM */
define(['react', 'mixins/timedRender'], function(React, TimedRender) {

    var ENTER_KEY = 13;
    var ESCAPE_KEY = 27;

    var Todo = React.createClass({

        // mixins: [TimedRender],
        render: function(){
            var cx = React.addons.classSet({
                'completed': this.props.todo.data().completed,
                'editing': this.state.editing
            });
            return (
                    <li ref="li" className={cx}>
		    <div className="view">
		    <input className="toggle" type="checkbox" checked={this.props.todo.data().completed} onChange={this.handleComplete} />
		    <label onDoubleClick={this.handleDoubleClick} >{this.props.todo.data().name}</label>
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

        //--------------------------------------------------------------------------------
        // CALLBACKS

        handleComplete: function() {
            this.props.todo.update({completed: !this.props.todo.data().completed});
        },

        handleDestroy: function() {
            this.props.todo.remove();
        },

        handleDoubleClick: function() {
            this.setState({editing: true});
        },

        handleChangeEdit: function(evt) {
            this.setState({name: evt.target.value});
        },

        handleEditKeypress: function(evt) {
            if (evt.keyCode == ESCAPE_KEY) {
                this.refs.edit.getDOMNode().value = this.props.todo.data().name;
                this.setState({editing: false, name: this.props.todo.data().name});
                return;
            }
            if (evt.keyCode != ENTER_KEY) {
                return;
            } 

            this.saveEdits();
        },


        //--------------------------------------------------------------------------------
        // INTERNAL FUNCTIONS

        saveEdits: function() {
            this.props.todo.update({name: this.refs.edit.getDOMNode().value.trim()});
            if (this.props.todo.data().name === '') {
                this.props.todo.remove();
            };
            this.setState({editing: false});
        },



        //--------------------------------------------------------------------------------
        // COMPONENT LIFECYCLE METHODS

        getInitialState: function(){
            return {editing: false, name: this.props.todo.data().name};
        },

        componentWillReceiveProps: function(nextProps) {
            this.setState({editing: false, name: nextProps.todo.data().name});
        },

        componentDidUpdate: function() {
            if (this.state.editing) {
                this.refs.edit.getDOMNode().focus();
                window.getSelection().collapseToEnd();
            }
        }


    });
    return Todo;
});