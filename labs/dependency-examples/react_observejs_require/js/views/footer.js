/** @jsx React.DOM */

define(['react'], function(React) {

    var UIFooter = React.createClass({

        render: function() {
            console.log('rendering footer');

            var completed = this.props.todos.filter(function(t){return t.completed;});

            var totalCount = this.props.todos.length;
            var completedCount = completed.length;

            var fStyle ={visibility: totalCount > 0 ? 'visible' : 'hidden'}
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
                    <button id="clear-completed" onClick={this.handleClearCompleted} >Clear completed ({completedCount})</button>

                    </footer>
            );
        },

        componentWillMount: function() {
            this.watchTodos(this, this.props);
        },

        componentWillUpdate: function(nextProps) {
            this.unwatchTodos(this, this.props);
            this.watchTodos(this, nextProps);
        },

        componentWillUnmount: function() {
            this.unwatchTodos(this, this.props);
        },

        watchTodos: function(self, props) {
            props.cb = function() {
                self.setState();
            };
            props.todos.forEach(function(t) {
                Object.observe(t, props.cb);
            });
        },

        unwatchTodos: function(self, props) {
            props.todos.forEach(function(t) {
                Object.unobserve(t, props.cb);
            });
        },

        handleClearCompleted: function() {
            this.props.todos.filter(function(t) { return t.completed }).forEach(function(t) { t.delete(); });
        }
        

    });

    return UIFooter;
    
});