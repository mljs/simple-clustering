/**
 *
 * @param {number[] | number[][]} dataMatrix - Similarity/connectivity matrix or array representing the upper triangular of the matrix.
 * @param {object} [options = {}] - options.
 * @param {number} [options.threshold = 0] - threshold to ignore an element value
 * @param {'assignment' | 'indexes' | 'values'} [options.out = 'assignment'] - Output type, it could to have value of 'assignment', 'values', 'indexes
 * @returns {number[][]}
 */
export function simpleClustering(dataMatrix, options = {}) {
  const { threshold = 0, out = 'assignment' } = options;
  let clList = [];
  if (typeof dataMatrix[0] === 'number') {
    // For very large matrices this is a bad idea:
    let conn = new Array(dataMatrix.length);
    for (let i = 0; i < dataMatrix.length; i++) {
      // @ts-ignore
      conn[i] = dataMatrix[i] > threshold ? 1 : 0;
    }
    clList = fullClusterGeneratorVector(conn);
  } else if (typeof dataMatrix[0] === 'object') {
    let nRows = dataMatrix.length;
    let conn = new Array((nRows * (nRows + 1)) / 2);
    let index = 0;
    for (let i = 0; i < nRows; i++) {
      for (let j = i; j < nRows; j++) {
        if (dataMatrix[i][j] > threshold) {
          conn[index++] = 1;
        } else {
          conn[index++] = 0;
        }
      }
    }
    clList = fullClusterGeneratorVector(conn);
  }
  if (out === 'indexes' || out === 'values') {
    let result = new Array(clList.length);
    for (let i = 0; i < clList.length; i++) {
      result[i] = [];
      for (let j = 0; j < clList[i].length; j++) {
        if (clList[i][j] !== 0) {
          result[i].push(j);
        }
      }
    }
    if (out === 'values') {
      let resultAsMatrix = new Array(result.length);
      for (let i = 0; i < result.length; i++) {
        resultAsMatrix[i] = new Array(result[i].length);
        for (let j = 0; j < result[i].length; j++) {
          resultAsMatrix[i][j] = new Array(result[i].length);
          for (let k = 0; k < result[i].length; k++) {
            resultAsMatrix[i][j][k] = dataMatrix[result[i][j]][result[i][k]];
          }
        }
      }
      return resultAsMatrix;
    } else {
      return result;
    }
  }

  return clList;
}

function fullClusterGeneratorVector(conn) {
  let nRows = Math.sqrt(conn.length * 2 + 0.25) - 0.5;
  let clusterList = [];
  let available = new Array(nRows);
  let remaining = nRows;
  let cluster = [];
  //Mark all the elements as available
  for (let i = nRows - 1; i >= 0; i--) {
    available[i] = 1;
  }
  let nextAv = -1;
  let toInclude = [];
  while (remaining > 0) {
    if (toInclude.length === 0) {
      //If there is no more elements to include. Start a new cluster
      cluster = new Array(nRows);
      for (let i = 0; i < nRows; i++) cluster[i] = 0;
      clusterList.push(cluster);
      for (nextAv = 0; available[nextAv] === 0; ) {
        nextAv++;
      }
    } else {
      nextAv = toInclude.splice(0, 1)[0];
    }
    cluster[nextAv] = 1;
    available[nextAv] = 0;
    remaining--;
    //Copy the next available row
    let row = new Array(nRows);
    for (let i = 0; i < nRows; i++) {
      let c = Math.max(nextAv, i);
      let r = Math.min(nextAv, i);
      //The element in the conn matrix
      //console.log("index: "+r*(2*nRows-r-1)/2+c)
      row[i] = conn[(r * (2 * nRows - r - 1)) / 2 + c];
      //There is new elements to include in this row?
      //Then, include it to the current cluster
      if (row[i] === 1 && available[i] === 1 && cluster[i] === 0) {
        toInclude.push(i);
        cluster[i] = 1;
      }
    }
  }
  return clusterList;
}
