# React, _tree, RequireJS TodoMVC Example

> React is a JavaScript library for creating user interfaces. Its core principles are declarative code, efficiency, and flexibility. Simply specify what your component looks like and React will keep it up-to-date when the underlying data changes.

> _[React - facebook.github.io/react](http://facebook.github.io/react)_

--------------------------------------------------------------------------------

> _tree is a javascript library that helps you generate immutable tree data structures.

> _[_tree - github.com/drfloob/_tree](https://github.com/drfloob/_tree)_


## Framework

`React` and `_tree` are the core of this framework. `React` on its own
is a beautiful UI framework, but it does not suggest an application
data model. `_tree` provides a powerful, performant data modeling
framework with all the benefits of immutable data structures.

Compared to [Om](https://github.com/swannodette/om), benchmark 1 is
just as fast, and benchmark 2 is only slightly slower. This framework
clocks in at ~60ms on bechmark 2, which is still *100x faster* than
the
[Backbone.js reference implementation](http://swannodette.github.io/todomvc/architecture-examples/backbone/index.html).

RequireJS is used as the module loader, and director is used for
routing.

## Running

To run the app, run `./dev.sh` and visit http://localhost:8000/.

`dev.sh` runs livereload on all js files. To stop the server, run
`./dev.sh -k`

## Credit

This TodoMVC application was created by [A.J. Heller](http://drfloob.com/).
