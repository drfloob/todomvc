require.config({
    'paths': {
        'react': '../bower_components/react/react-with-addons',
        'jsx': '../bower_components/require-jsx/jsx',
        'director': '../bower_components/director/build/director',
        'JSXTransformer': '../bower_components/react/JSXTransformer',
        'chinchilla': '../bower_components/chinchilla/dist/chinchilla.min',
        'underscore': '../bower_components/underscore/underscore',
        '_tree': '../bower_components/_tree/src/_tree',
    },
    'shim': {
        'JSXTransformer': {exports: 'JSXTransformer'},
        'director': {exports: 'Router'},
        'underscore': {exports: '_'}
    }
});

require(['react', 'jsx!views/app', 'data/main', 'router'], function(React, App, Data, Router) {

    var app = React.renderComponent(App({model: Data}), document.getElementById('todoapp'));

    Data.on('afterUpdate', function(newModel) {
        console.log('newModel');
        app.setProps({'model':  newModel});
    });

    document.getElementById('bench1').onclick = function(event) {
        var s, e, b;

        s = Date.now();
        b = Data.batch();
        _.each(_.range(200), function() {
            b.root().parseAndAddChild([{name: 'todo', completed: false}]);
        });
        b.end();
        e = Date.now();
        document.getElementById("message").innerText = e-s;
    };

    document.getElementById('bench2').onclick = function(event) {
        var s, e, b;
        s = Date.now();

        b = Data.batch();
        _.each(_.range(200), function() {
            b.root().parseAndAddChild([{name: 'todo', completed: false}]);
        });
        _.each(_.range(5), function() {
            _.each(b.root().children(), function(k) {
                k.update({completed: !k.data().completed});
            });
        });
        b.root().removeAll(b.root().children());

        b.end();

        e = Date.now();
        document.getElementById("message").innerText = e-s;
    };

    Router.init();
});