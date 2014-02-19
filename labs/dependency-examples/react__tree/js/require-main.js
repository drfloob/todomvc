require.config({
    'paths': {
        'react': '../bower_components/react/react-with-addons',
        'jsx': '../bower_components/require-jsx/jsx',
        'director': '../bower_components/director/build/director',
        'JSXTransformer': '../bower_components/react/JSXTransformer',
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
        localStorage.setItem('todomvc-_tree', JSON.stringify(newModel.serialize()));
        app.setProps({'model':  newModel});
    });

    document.getElementById('bench1').onclick = function(event) {
        var s, e, b;

        s = Date.now();
        b = TodoList.batch();
        _.each(_.range(200), function() {
            b.newTodo('todo');
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
            b.newTodo('todo');
        });
        _.each(_.range(5), function() {
            _.each(b.getAll(), function(k) {
                k.toggleCompleted();
            });
        });
        b.root().removeAll(b.getAll());

        b.end();

        e = Date.now();
        document.getElementById("message").innerText = e-s;
    };

    Router.init();
});