# React, Chinchilla, RequireJS TodoMVC Example

> React is a JavaScript library for creating user interfaces. Its core principles are declarative code, efficiency, and flexibility. Simply specify what your component looks like and React will keep it up-to-date when the underlying data changes.

> _[React - facebook.github.io/react](http://facebook.github.io/react)_

--------------------------------------------------------------------------------

> Chinchilla is an immutable "hash tree", or hierarchical dictionary.

> _[Chinchilla - github.com/drfloob/chinchilla](https://github.com/drfloob/chinchilla)_


## Framework

React and Chinchilla are the core of this framework. React on its own
is a beautiful UI framework, but it does not suggest an application
data model. Chinchilla provides a data model framework with all the
benefits of immutable data structures.

Compared to [Om](https://github.com/swannodette/om) on the "add 200
todo items" benchmark, this framework is nearly as fast. Om's
Benchmark 2 is ridiculous @ ~5ms. This framework clocks in at ~500ms on bechmark 2,
which is still *10x faster* than the
[Backbone.js reference implementation](http://swannodette.github.io/todomvc/architecture-examples/backbone/index.html).

RequireJS is used as the module loader, and director is used for
routing.

## Running

To run the app, run `./dev.sh` and visit http://localhost:8000/.

`dev.sh` runs livereload on all js files. To stop the server, run
`./dev.sh -k`

## Credit

This TodoMVC application was created by [floob](http://drfloob.com/).
