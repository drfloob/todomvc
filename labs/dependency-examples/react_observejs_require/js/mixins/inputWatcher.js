/** @jsx React.DOM */
define([], function() {
    var iw = {
        inputWatcher: {
            makeForRef: function(ref, self) {
                return function(event) {
                    if (event.keyCode == self.inputWatcher.keys.ENTER && self.onEnter) {
                        return self.onEnter(ref, self.refs[ref]);
                    }
                    if (event.keyCode == self.inputWatcher.keys.ESCAPE && self.onEscape) {
                        return self.onEscape(ref, self.refs[ref]);
                    }
                };
            },
            keys: {
                ENTER: 13,
                ESCAPE: 27
            }
        }
    };
    return iw;
});