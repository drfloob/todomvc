/** @jsx React.DOM */

define(['react', 'router'], function(React, router) {

    var UIFooter = React.createClass({

        render: function() {
            console.log('rendering footer');

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


        //--------------------------------------------------------------------------------
        // TODO watchers
        
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