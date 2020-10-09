export interface ClusteringOptions {
  /**
   * threshold to ignore an element value
   * @default `0`
   */
  threshold?: number;
  /**
   * Output type, it could to have value of 'assignment', 'values', 'indexes
   * @default `'assignment'`
   */
  out?: string
}

export interface DataMatrix {
  /**
   * Similarity/connectivity matrix or array representing the upper triangular of the matrix.
   */
  dataMatrix: number[][] | number[],
}

export function simpleClustering(
  dataMatrix: DataMatrix,
  options?: ClusteringOptions
): number[][];