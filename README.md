# simple-clustering
<p align="center">
Finds the isolated clusters from a similarity/connectivity matrix
</p>

The input could be a matrix (array of arrays) or it could be a single array containing the values of the upper triangular of that matrix.

By default the function returns a clustering matrix: It is a binary row wise matrix, where each row has n components. The ones at row i and column j indicates that element j belong to cluster i.

## Installation

`$ npm install ml-simple-clustering`

## Usage
### As an ES module

```js
import { simpleClustering } from 'ml-simple-clustering';

const clusters = simpleClustering(dataMatrix, options);
```

### As a CommonJS module

```js
const { simpleClustering } = require('ml-simple-clustering');

const clusters = simpleClustering(dataMatrix, options);
```
## [API Documentation](https://mljs.github.io/simpleClustering/docs/globals.html)
In order to get a general idea of the problem you could also check the [Wikipedia article](https://en.wikipedia.org/wiki/Flood_fill).
## Examples

```js
const { simpleClustering } = require('ml-ml-simple-clustering');

let matrix = [
  [1, 2, 0, 0],
  [1, 2, 0, 0],
  [0, 0, 3, 4],
  [0, 0, 5, 6],
];

let clusters = simpleClustering(matrix, {
  threshold: 0,
  out: 'values',
});
console.log(`clusters = ${clusters}`);
/**
 clusters = [
  [
    [1, 2],
    [1, 2],
  ],
  [
    [3, 4],
    [5, 6],
  ],
]
  */
```

## License

[MIT](./LICENSE)
