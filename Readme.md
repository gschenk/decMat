# Decission Matrix Tool
This is a small job decission matrix tool.
It visualises categories and sorted lists from a yaml.

This is a toy project to get an idea of how to use node
and npm. But also an idea of the tool chain and common
practices for JS.

## How to Run it
Node 13 allows import for ES modules. However this turns of
automatic resolution of extensions.

Unless one run node with
`--es-module-specifier-resolution=node`
the relative path and suffix of each imported file needs to
be spelled out in source.

This may be in conflict with best practices, for instance, the
AirBnB style guide.

##Targets and Todos
* set up linting and write AirBnB style code
* read input from yaml as structured data
* write unit test
* set up automated testing
* set up automated documentation
* prototype html/css output
* modularise view, css components
* make neat css output
