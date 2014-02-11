define(['data/main'], function(data) {

    var killed = 0;

    return {
        kill: function() {
            killed++;
        },
        go: function() {
            killed--;
            if (!this.isKilled()) {
                // HA!
                console.log('unkilling on go');
                data.data(data.data());
            }
        },
        isKilled: function() {
            return killed !== 0;
        }
    };
});