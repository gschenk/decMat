# Decission Matrix Tool
This is a small job decission matrix tool.
It visualises categories and ordered lists from a yaml
with the following pattern:

```
first category:
- top item
- second item
second category:
- top item
```

Purpose of this is to allow you to write down a decission
matrix with [stack ranking][1] (not a scorecard) comfortably
in your prefered editor. Using an unobstrusive syntax
and then render it nicely. Without touching things like
Trello boards or -- shudder to think -- Spreadsheets.

Foremost though, this is a toy project to get an idea of how
to use node and npm. But also an idea of the tool chain and
common practices for JS.

## How to Run it
Node 13 allows import for ES modules. However this turns of
automatic resolution of extensions.

Unless one run node with
`--es-module-specifier-resolution=node`
the relative path and suffix of each imported file needs to
be spelled out in source.

This may be in conflict with best practices, for instance, the
AirBnB style guide.

An argument containing path and name of an input file xor the 
'-' sign to read from STDIN are supported.

From the project directory run as
`> node ./src/index.js [myfile.yaml]`
or with the '-' argument to read from STDIN
`node ./src/index.js - `
without any arguments the default example.yaml will be shown.


## Testing
I cannot get Jest to run with ES6+.  Apparently, there is no
ES module support yet since nodeJS API is not ready for it.

After long and frustrating finicking with Mocha (mocha-esm package)
I could persuade it only to read tests from a single file named
in the script section in package.json.

## Targets and Todos
- [x] set up linting and write AirBnB style code (done)
- [x] read input from yaml as structured data
- [x] write unit test
- [x] set up automated testing
- [ ] set up automated documentation
- [x] prototype html/css output
- [x] modularise view, css components
- [x] make neat css output
- [x] user specified input file name (or automated)

### Possible Extensions
- [ ] move layout options to config yaml
- [ ] weight class for matrix items
- [ ] add embelishments like legends


[1]: https://www.geekwire.com/2012/job-decision-matrix/
