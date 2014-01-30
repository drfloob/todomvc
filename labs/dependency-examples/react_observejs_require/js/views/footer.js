/** @jsx React.DOM */

define(['react'], function(React) {

    var UIFooter = React.createClass({

        componentWillMount: function() {
        },

        render: function() {
            var total = this.props.todos.length;
            var completed = this.props.todos.length;

            var fStyle ={visibility: total > 0 ? 'visible' : 'hidden'}
            return ( 
		    <footer style={fStyle} id="footer">
		    {/*<!-- This should be `0 items left` by default -->*/}
		    <span id="todo-count"><strong>1</strong> item left</span>

                    <ul id="filters">
                    <li>
                    <a className="selected" href="#/">All</a>
                    </li>
                    <li>
                    <a href="#/active">Active</a>
                    </li>
                    <li>
                    <a href="#/completed">Completed</a>
                    </li>
                    </ul>

                    {/*<!-- Hidden if no completed items are left ↓ -->*/}
                    <button id="clear-completed">Clear completed ({completed})</button>

                    </footer>
            );
        }

    });

    return UIFooter;
    
});