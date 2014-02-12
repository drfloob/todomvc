/** @jsx React.DOM */

define(['react', 'underscore', 'router'], function(React, _, router) {

    var Footer = React.createClass({

        render: function() {
            var completed = _.filter(this.props.model.root().children(), function(k) { return k.data().completed; });
            var active = _.filter(this.props.model.root().children(), function(k) { return !k.data().completed; });

            var totalCount = this.props.model.root().children().length;
            var completedCount = completed.length;

            var s = active.length == 1 ? '' : 's';
            var fStyle ={visibility: totalCount > 0 ? 'visible' : 'hidden'}
            var cStyle = {visibility: completedCount > 0 ? 'visible' : 'hidden'}

            var allClass = this.props.filter === router.ALL ? 'selected' : '';
            var activeClass = this.props.filter === router.ACTIVE ? 'selected' : '';
            var completedClass = this.props.filter === router.COMPLETED ? 'selected' : '';

            return ( 
		    <footer style={fStyle} id="footer">
		    <span id="todo-count"><strong>{active.length}</strong> item{s} left</span>

                    <ul id="filters">
                    <li>
                    <a className={allClass} href="#/">All</a>
                    </li>
                    <li>
                    <a className={activeClass} href="#/active">Active</a>
                    </li>
                    <li>
                    <a className={completedClass} href="#/completed">Completed</a>
                    </li>
                    </ul>

                    <button style={cStyle} id="clear-completed" onClick={this.handleClearCompleted} >Clear completed ({completedCount})</button>

                    </footer>
            );
        },

        //--------------------------------------------------------------------------------
        // CALLBACKS
        
        handleClearCompleted: function() {
            this.props.model.root().removeAll(
                _.filter(this.props.model.root().children(), function(k) { return k.data().completed; })
            );
        }

    });

    return Footer;
    
});