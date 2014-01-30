/** @jsx React.DOM */

define(['react', 'jsx!views/main', 'jsx!views/footer'], function(React, UIMain, UIFooter) {

    var UIApp = React.createClass({
        
        render: function() {

            return ( 
                <div>
		    <header id="header">
		    <h1>todos</h1>
		    <input id="new-todo" placeholder="What needs to be done?" autoFocus="true" />
		    </header>

                    <UIMain todos={this.props.todos} />

                    <UIFooter todos={this.props.todos} />

                    </div>
            );
        },

        componentDidMount: function() {
            var self = this;

            // self.obs = new Observer.ArrayObserver(self.props.todos);
            // self.obs.open(function(splices) {
            //     console.log('updating app', splices);
            //     self.forceUpdate();
            // });

            ObserveUtils.List.observe(self.props.todos, function() {
                console.log('updating app', splices);
                self.forceUpdate();
            });
        }

    });

    return UIApp;
    
});