/** @jsx React.DOM */

define(['react'], function(React) {
    var PropWatch = {
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
            var objs = [];
            var emit = function(l) { objs.push(l); };
            this.propWatch_getObjs(emit, props);

            props.cb = function() {
                self.setState();
            };
            objs.forEach(function(o) {
                Object.observe(o, props.cb);
            });

            if (this.propWatch_onWatch) {
                this.propWatch_onWatch(props);
            }
        },

        unwatch: function(props) {
            var objs = [];
            var emit = function(l) { objs.push(l); };
            this.propWatch_getObjs(emit, props);

            objs.forEach(function(o) {
                Object.unobserve(o, props.cb);
            });
        }
        
    };

    return PropWatch;
});