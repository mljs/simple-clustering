# simple-clustering

This function finds the isolated clusters from a similarity/connectivity matrix. The input could be a matrix (array of arrays) or it could be a single array containing the values of the upper triangular of that matrix.

By default the function returns a clustering matrix: It is a binary row wise matrix, where each row has n components. The ones at row i and column j indicates that element j belong to cluster i.

....
