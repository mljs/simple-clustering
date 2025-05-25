import { describe, expect, it } from 'vitest';

import { simpleClustering } from '../index.js';

describe('Test', () => {
  it('Simple matrix', () => {
    let matrix = [
      [1, 2, 0, 0],
      [1, 2, 0, 0],
      [0, 0, 3, 4],
      [0, 0, 5, 6],
    ];

    let values = simpleClustering(matrix, {
      threshold: 0,
      out: 'values',
    });

    expect(values).toStrictEqual([
      [
        [1, 2],
        [1, 2],
      ],
      [
        [3, 4],
        [5, 6],
      ],
    ]);
  });

  it('Trivial matrix 2 x 2', () => {
    let matrix = [
      [1, 0],
      [0, 2],
    ];

    let values = simpleClustering(matrix, {
      threshold: 0,
      out: 'values',
    });

    expect(values).toStrictEqual([[[1]], [[2]]]);
  });

  it('Clusters a simple similarity matrix and outputs indexes', () => {
    let matrix = [
      [1, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 1, 1],
    ];

    let values = simpleClustering(matrix, {
      threshold: 0,
      out: 'indexes',
    });

    expect(values).toStrictEqual([
      [0, 1],
      [2, 3],
      [4, 5],
    ]);
  });

  it('Clusters a more complex similarity matrix and outputs indexes', () => {
    let matrix = [
      [1.0, 1.0, 0.0, 0.0, 0.0, 0.0],
      [1.0, 1.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 1.0, 0.7, 0.0, 0.0],
      [0.0, 0.0, 0.7, 1.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 1.0, 0.3],
      [0.0, 0.0, 0.0, 0.0, 0.3, 1.0],
    ];

    let values = simpleClustering(matrix, {
      threshold: 0,
      out: 'indexes',
    });

    expect(values).toStrictEqual([
      [0, 1],
      [2, 3],
      [4, 5],
    ]);
  });

  it('Clusters a similarity matrix with several permutations and threshold above 0', () => {
    let matrix = [
      [1.0, 0.2, 1.0, 0.1, 0.0, 0.2],
      [0.2, 1.0, 0.2, 0.3, 0.7, 0.1],
      [1.0, 0.2, 1.0, 0.0, 0.1, 0.0],
      [0.1, 0.3, 0.0, 1.0, 0.0, 0.3],
      [0.1, 0.7, 0.0, 0.1, 1.0, 0.0],
      [0.2, 0.0, 0.0, 0.3, 0.0, 1.0],
    ];

    let values = simpleClustering(matrix, {
      threshold: 0.3,
      out: 'indexes',
    });

    expect(values).toStrictEqual([[0, 2], [1, 4], [3], [5]]);
  });

  it('Clusters a vector representing a similarity matrix with a threshold above 0', () => {
    let vector = [
      1.0, 0.2, 1.0, 0.1, 0.0, 0.2, 1.0, 0.2, 0.3, 0.7, 0.1, 1.0, 0.0, 0.1, 0.0,
      1.0, 0.0, 0.3, 1.0, 0.0, 1.0,
    ];

    let values = simpleClustering(vector, {
      threshold: 0.3,
      out: 'indexes',
    });

    expect(values).toStrictEqual([[0, 2], [1, 4], [3], [5]]);
  });
});
