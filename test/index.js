'use strict';

let simpleClustering = require('..');

describe('Test', function () {

    it('Simple matrix', function () {
        let matrix = [
            [1,2,0,0],
            [1,2,0,0],
            [0,0,3,4],
            [0,0,5,6]
        ];

        let values = simpleClustering(matrix,{
            threshold:0,
            out:'values'}
        );

        values.should.be.eql([[[1,2], [1,2]], [[3,4], [5,6]]]);
    });

    it('Trivial matrix 2 x 4', function () {
        let matrix = [
            [1,1,0,0],
            [0,0,5,6]
        ];

        let values = simpleClustering(matrix,{
            threshold:0,
            out:'values'}
        );
        
        values.should.be.eql(
            [
                [[1,1]],
                [[5,6]]
            ]);
    });

    it('Trivial matrix 4 x 2', function () {
        let matrix = [
            [1,0],
            [1,0],
            [0,5],
            [0,5]
        ];

        let values = simpleClustering(matrix,{
            threshold:0,
            out:'values'}
        );

        values.should.be.eql(
            [
                [[1],[1]],
                [[5],[6]]
            ]);
    });

    it('Trivial matrix 2 x 2', function () {
        let matrix = [
            [1,0],
            [0,2]
        ];

        let values = simpleClustering(matrix,{
            threshold:0,
            out:'values'}
        );

        values.should.be.eql(
            [
                [[1]],
                [[2]]
            ]);
    });
    
    it('No change matrix', function () {
        let matrix = [
            [1,1,2,2],
            [0,0,5,6]
        ];

        let values = simpleClustering(matrix,{
            threshold:0,
            out:'values'}
        );
        
        values.should.be.eql(matrix);
    });

	it('Clusters a simple similarity matrix and outputs indexes', function () {
		let options = {
			threshold: 0,
			out: 'indexes'
		};

		let matrix = [
			[1, 1, 0, 0, 0, 0],
			[1, 1, 0, 0, 0, 0],
			[0, 0, 1, 1, 0, 0],
			[0, 0, 1, 1, 0, 0],
			[0, 0, 0, 0, 1, 1],
			[0, 0, 0, 0, 1, 1],
		];

		let values = simpleClustering(matrix, options);

		values.should.be.eql(
			[
				[0,1],
				[2,3],
				[4,5]
			]
		);
	});

	it('Clusters a more complex similarity matrix and outputs indexes', function () {
		let options = {
			threshold: 0,
			out: 'indexes'
		};

		let matrix = [
			[1.0, 1.0, 0.0, 0.0, 0.0, 0.0],
			[1.0, 1.0, 0.0, 0.0, 0.0, 0.0],
			[0.0, 0.0, 1.0, 0.7, 0.0, 0.0],
			[0.0, 0.0, 0.7, 1.0, 0.0, 0.0],
			[0.0, 0.0, 0.0, 0.0, 1.0, 0.3],
			[0.0, 0.0, 0.0, 0.0, 0.3, 1.0],
		];

		let values = simpleClustering(matrix, options);

		values.should.be.eql(
			[
				[0,1],
				[2,3],
				[4,5]
			]
		);
	});

	it('Clusters a similarity matrix with several permutations and threshold above 0', function () {
		let options = {
			threshold: 0.3,
			out: 'indexes'
		};

		let matrix = [
			[1.0, 0.2, 1.0, 0.1, 0.0, 0.2],
			[0.2, 1.0, 0.2, 0.3, 0.7, 0.1],
			[1.0, 0.2, 1.0, 0.0, 0.1, 0.0],
			[0.1, 0.3, 0.0, 1.0, 0.0, 0.3],
			[0.1, 0.7, 0.0, 0.1, 1.0, 0.0],
			[0.2, 0.0, 0.0, 0.3, 0.0, 1.0],
		];

		let values = simpleClustering(matrix, options);

		values.should.be.eql(
			[
				[0,2],
				[1,4],
				[3],
				[5]
			]
		);
	});

	it('Clusters a vector representing a similarity matrix with a threshold above 0', function () {
		let options = {
			threshold: 0.3,
			out: 'indexes'
		};

		let vector = [1.0, 0.2, 1.0, 0.1, 0.0, 0.2, 1.0, 0.2, 0.3, 0.7, 0.1, 1.0, 0.0, 0.1, 0.0, 1.0, 0.0, 0.3, 1.0, 0.0, 1.0];

		let values = simpleClustering(vector, options);

		values.should.be.eql(
			[
				[0,2],
				[1,4],
				[3],
				[5]
			]
		);
	});
});
