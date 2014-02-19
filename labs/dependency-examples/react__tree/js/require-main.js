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

require(['react', 'jsx!views/app', 'data/main', 'router'], function(React, App, TodoList, Router) {

    var app = React.renderComponent(App({model: TodoList}), document.getElementById('todoapp'));

    TodoList.onUpdate(function(newModel) {
        console.log('newModel');
        TodoList = newModel;
        app.setProps({'model':  newModel});
    });

    document.getElementById('bench1').onclick = function(event) {
        var s, e, b;

        s = Date.now();
        b = TodoList.batch();
        _.each(_.range(200), function() {
            b.root().parseAndAddChild({name: 'todo', completed: false});
        });
        b.end();
        e = Date.now();
        document.getElementById("message").innerText = e-s;
    };

    document.getElementById('bench2').onclick = function(event) {
        var s, e, b;
        s = Date.now();

        b = TodoList.batch();
        _.each(_.range(200), function() {
            b.root().parseAndAddChild({name: 'todo', completed: false});
        });
        _.each(_.range(5), function() {
            _.each(b.root().children(), function(k) {
                k.toggleCompleted();
            });
        });
        b.root().removeAll(b.root().children());

        b.end();

        e = Date.now();
        document.getElementById("message").innerText = e-s;
    };

    Router.init();
});