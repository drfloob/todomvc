/** @jsx React.DOM */

define(['react', 'router'], function(React, router) {

    var UIFooter = React.createClass({

        mixins: [Object.observe.react.watchAll],
        observe: {
            whichLists: function(emit, props) {
                emit(props.todos);
            }
        },


        render: function() {
            var completed = this.props.todos.getCompleted();
            var active = this.props.todos.getActive();

            var totalCount = this.props.todos.length;
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
            this.props.todos.getCompleted().forEach(function(t) { t.delete(); });
        }

    });

    return UIFooter;
    
});