require.config({
    paths: {
        'react': '../bower_components/react/react-with-addons',
        'observe-js': '../bower_components/observe-js/src/observe',
        'director': '../bower_components/director/build/director.min',
        'jsx': '../bower_components/require-jsx/jsx',
        'JSXTransformer': '../bower_components/react/JSXTransformer',
        'observe-shim': '../bower_components/observe-shim/lib/observe-shim',
        'observe-utils': '../bower_components/observe-utils/lib/observe-utils',
        'setImmediate': '../bower_components/setImmediate/setImmediate'
    },
    shim: {
        'JSXTransformer': {exports: 'JSXTransformer'},
        'observe-shim': {deps: ['setImmediate']},
        'director': {exports: 'Router'}
    }
});

require(['models/todos', 'jsx!views/app', 'react', 'router','observe-shim', 'observe-utils'], function(Todos, UIApp, React, router) {

    React.renderComponent(UIApp({todos: Todos}), document.getElementById('todoapp'));
    router.init();

});