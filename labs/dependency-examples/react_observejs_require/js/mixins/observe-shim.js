/** @jsx React.DOM */

define(['observe-shim'], function() {

    Object.observe.react = Object.observe.react || {};
    Object.observe.react.watch = {
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
            this.observe.which(emit, props);

            props.cb = function() {
                self.setState();
            };
            objs.forEach(function(o) {
                Object.observe(o, props.cb);
            });

            if (this.observe.onWatch) {
                this.observe.onWatch(props);
            }
        },

        unwatch: function(props) {
            var objs = [];
            var emit = function(l) { objs.push(l); };
            this.observe.which(emit, props);

            objs.forEach(function(o) {
                Object.unobserve(o, props.cb);
            });
        }
        
    };


    Object.observe.react.watchAll = {
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
            this.observe.whichLists(emit, props);

            props.cb = function() {
                self.setState();
            };
            lists.forEach(function(l) {
                l.forEach(function(t) {
                    Object.observe(t, props.cb);
                });
            });

            if (this.observe.onWatchLists) {
                this.observe.onWatchLists(props);
            }
        },

        unwatch: function(props) {
            var lists = [];
            var emit = function(l) { lists.push(l); };
            this.observe.whichLists(emit, props);

            lists.forEach(function(l) {
                l.forEach(function(t) {
                    Object.unobserve(t, props.cb);
                });
            });
        }
        
    }

    return Object;
});