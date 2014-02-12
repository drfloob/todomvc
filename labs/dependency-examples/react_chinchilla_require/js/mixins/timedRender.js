define([], function() {

    return {
        componentWillMount: function() {
            this.s = Date.now();
        },
        componentDidMount: function() {
            var e =Date.now();
            console.log(this.constructor.displayName, 'took', (e-this.s)/1000, 'seconds to render');
        },
    }

});