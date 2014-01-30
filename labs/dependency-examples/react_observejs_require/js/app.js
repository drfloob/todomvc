require.config({
    paths: {
        'react': '../bower_components/react/react-with-addons',
        'observe-js': '../bower_components/observe-js/src/observe',
        'director': '../bower_components/director/build/director.min',
        'jsx': '../bower_components/require-jsx/jsx',
        'JSXTransformer': '../bower_components/react/JSXTransformer',
        'observe-shim': '../bower_components/observe-shim/lib/observe-shim',
        'observe-utils': '../bower_components/observe-utils/lib/observe-utils'
    },
    shim: {
        'JSXTransformer': {exports: 'JSXTransformer'},
        'observe-utils': {exports: 'ObserveUtils'},
        'observe-shim': {
            'deps': ['observe-utils']
        },
        'observe-js': {init: function() {
            var ret = {};
            ret.Observer = this.Observer;
            ret.ArrayObserver = this.ArrayObserver;
            ret.ArraySplice = this.ArraySplice;
            ret.ObjectObserver = this.ObjectObserver;
            ret.PathObserver = this.PathObserver;
            ret.CompoundObserver = this.CompoundObserver;
            ret.Path = this.Path;
            ret.ObserverTransform = this.ObserverTransform;
            ret.Platform = this.Platform;

            return ret;
        }}
    }
});

require(['models/todos', 'jsx!views/app', 'react', 'observe-shim'], function(Todos, UIApp, React) {

    React.renderComponent(UIApp({todos: Todos}), document.getElementById('todoapp'));
    
});