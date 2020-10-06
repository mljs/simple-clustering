/**
 * Created by acastillo on 8/8/16.
 */
'use strict';

const defOptions = {
    threshold: 0,
    out:'assignment'
};

//TODO Consider a matrix of distances too
module.exports = function fullClusterGenerator(conMat, opt) {
    const options = Object.assign({}, defOptions, opt);
    let clList = [];
    if (typeof conMat[0] === 'number') {
        // For very large matrices this is a bad idea:
        let conn = new Array(conMat.length);
        for(let i = 0; i < conMat.length; i++) {
            conn[i] = conMat[i] > options.threshold ? 1 : 0;
        }
        clList = fullClusterGeneratorVector(conn);
    } else {
        if (typeof conMat[0] === 'object') {
            let nRows = conMat.length;
            let conn = new Array(nRows * (nRows + 1) / 2);
            let index = 0;
            for (let i = 0;i < nRows;i++) {
                for (let j = i;j < nRows;j++) {
                    if (conMat[i][j] > options.threshold) {
                        conn[index++] = 1;
                    } else {
                        conn[index++] = 0;
                    }
                }
            }
            clList = fullClusterGeneratorVector(conn);
        }
    }
    if (options.out === 'indexes' || options.out === 'values') {
        let result = new Array(clList.length);
        for (let i = 0;i < clList.length;i++) {
            result[i] = [];
            for (let j = 0;j < clList[i].length;j++) {
                if (clList[i][j] !== 0) {
                    result[i].push(j);
                }
            }
        }
        if (options.out === 'values') {
            let resultAsMatrix = new Array(result.length);
            for (let i = 0; i < result.length;i++) {
                resultAsMatrix[i] = new Array(result[i].length);
                for (let j = 0; j < result[i].length; j++) {
                    resultAsMatrix[i][j] = new Array(result[i].length);
                    for (let k = 0; k < result[i].length; k++) {
                        resultAsMatrix[i][j][k] = conMat[result[i][j]][result[i][k]];
                    }
                }
            }
            return resultAsMatrix;
        }
        else {
            return result;
        }
    }

    return clList;

};

function fullClusterGeneratorVector(conn) {
    let nRows = Math.sqrt(conn.length * 2 + 0.25) - 0.5;
    let clusterList = [];
    let available = new Array(nRows);
    let remaining = nRows, i = 0;
    let cluster = [];
    //Mark all the elements as available
    for (i = nRows - 1;i >= 0;i--) {
        available[i] = 1;
    }
    let nextAv = -1;
    let toInclude = [];
    while (remaining > 0) {
        if (toInclude.length === 0) {
            //If there is no more elements to include. Start a new cluster
            cluster = new Array(nRows);
            for (i = 0; i < nRows; i++)
                cluster[i] = 0;
            clusterList.push(cluster);
            for (nextAv = 0; available[nextAv] === 0; nextAv++) {}
        } else {
            nextAv = toInclude.splice(0,1);
        }
        cluster[nextAv] = 1;
        available[nextAv] = 0;
        remaining--;
        //Copy the next available row
        let row = new Array(nRows);
        for (i = 0; i < nRows; i++) {
            let c = Math.max(nextAv,i);
            let r = Math.min(nextAv,i);
            //The element in the conn matrix
            //console.log("index: "+r*(2*nRows-r-1)/2+c)
            row[i] = conn[r * (2 * nRows - r - 1) / 2 + c];
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
