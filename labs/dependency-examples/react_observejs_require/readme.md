# [ facebook/react, Polymer/observe-js, flatiron/director, jburke/requirejs ] TodoMVC Example

[observe-js](https://github.com/Polymer/observe-js) is a library for
observing changes in JavaScript data. It exposes a high-level API and
uses Object.observe if available, and otherwise performs
dirty-checking. observe-js requires ECMAScript 5.

[React](https://github.com/facebook/react) is a JavaScript library for
building user interfaces.

[Director](https://github.com/flatiron/director) is a router. Routing
is the process of determining what code to run when a URL is
requested.

[RequireJS](https://github.com/jrburke/requirejs) is a JavaScript file
and module loader. It is optimized for in-browser use, but it can be
used in other JavaScript environments, like Rhino and Node. Using a
modular script loader like RequireJS will improve the speed and
quality of your code.

## Implementation

Inspired by the performant implementation of David Nolen's
[Om](https://github.com/swannodette/om) framework:

 * All application state is maintained at the top level,
 * `shouldComponentUpdate` is implemented to quickly short circuit
   renderings on each component, and
 * `requestAnimationFrame` is used to make rendering more efficient

The eventual goal is to abstract these behaviors into a single React
mixin.


## Running

To run the app, spin up an HTTP server and visit http://localhost/.../myexample/.


## Credit

This TodoMVC application was created by [drfloob](http://drfloob.com).
