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
		    <label onDoubleClick={this.handleDoubleClick} >{this.props.todo.title()}</label>
		    <button className="destroy" onClick={this.handleDestroy}></button>
		    </div>
		    <input 
                ref="edit" 
                className="edit" 
                value={this.state.title} 
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
            this.props.todo.toggleCompleted();
        },

        handleDestroy: function() {
            this.props.todo.remove();
        },

        handleDoubleClick: function() {
            this.setState({editing: true});
        },

        handleChangeEdit: function(evt) {
            this.setState({title: evt.target.value});
        },

        handleEditKeypress: function(evt) {
            if (evt.keyCode == ESCAPE_KEY) {
                this.refs.edit.getDOMNode().value = this.props.todo.title();
                this.setState({editing: false, title: this.props.todo.title()});
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
            this.props.todo.title(this.refs.edit.getDOMNode().value.trim());
            if (this.props.todo.title() === '') {
                this.props.todo.remove();
            };
            this.setState({editing: false});
        },



        //--------------------------------------------------------------------------------
        // COMPONENT LIFECYCLE METHODS

        getInitialState: function(){
            return {editing: false, title: this.props.todo.title()};
        },

        componentWillReceiveProps: function(nextProps) {
            this.setState({editing: false, title: nextProps.todo.title()});
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