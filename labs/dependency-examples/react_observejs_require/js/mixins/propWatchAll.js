/** @jsx React.DOM */

define(['react'], function(React) {
    var PropWatchAll = {
        componentWillMount: function() {
            this.watch(this.props);
        },

        componentWillUpdate: function(nextProps) {
            this.unwatch(this.props);
            this.watch(nextProps);
        },

        componentWillUnmount: function() {
            this.unwatch(this.props);
        },


        watch: function(props) {
            var self = this;
            var lists = [];
            var emit = function(l) { lists.push(l); };
            this.propWatchAll_getLists(emit, props);

            props.cb = function() {
                self.setState();
            };
            lists.forEach(function(l) {
                l.forEach(function(t) {
                    Object.observe(t, props.cb);
                });
            });

            if (this.propWatchAll_onWatch) {
                this.propWatchAll_onWatch(props);
            }
        },

        unwatch: function(props) {
            var lists = [];
            var emit = function(l) { lists.push(l); };
            this.propWatchAll_getLists(emit, props);

            lists.forEach(function(l) {
                l.forEach(function(t) {
                    Object.unobserve(t, props.cb);
                });
            });
        }
        
    };

    return PropWatchAll;
});