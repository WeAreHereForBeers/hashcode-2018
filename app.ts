/*
 * 🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦
 * 🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕
 *              __                                             _     _  __                
 *             /_/                                     ___    | |   (_) \_\               
 *  _ __ ___   ___  ___  __ _ _ __   __ _  ___  ___   ( _ )   | |__  _  ___ _ __ ___  ___ 
 * | '_ ` _ \ / _ \/ __|/ _` | '_ \ / _` |/ _ \/ __|  / _ \/\ | '_ \| |/ _ \ '__/ _ \/ __|
 * | | | | | |  __/\__ \ (_| | | | | (_| |  __/\__ \ | (_>  < | |_) | |  __/ | |  __/\__ \
 * |_| |_| |_|\___||___/\__,_|_| |_|\__, |\___||___/  \___/\/ |_.__/|_|\___|_|  \___||___/
 *                                   __/ |                                                
 *                                  |___/                                                 
 * 🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕🍺🍕
 * 🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦🐦
 */
import * as fs from 'fs';

class Data {
    constructor(public R?: number, public C?: number, public F?: number, public N?: number, public B?: number, public T?: number, public rides?: Ride[]) {}
}

class Ride {
    constructor(public a?: number, public b?: number, public x?: number, public y?: number, public s?: number, public f?: number) {}
}

class Solution {
    constructor(public rides?: RideSolution[]) {}
}

class RideSolution {
    constructor(public M?: number, public R?: number[]) {}
}

let filenames = ['a_example.in', 'b_should_be_easy.in', 'c_no_hurry.in', 'd_metropolis.in', 'e_high_bonus.in'];

//forEach file in the folder in
filenames.forEach(filename => {
    const data = new Data();
    let lines = fs.readFileSync('in/' + filename, 'utf-8').split('\n');

    let firstLine = lines[0].split(' ');

    data.R = +firstLine[0];
    data.C = +firstLine[1];
    data.F = +firstLine[2];
    data.N = +firstLine[3];
    data.B = +firstLine[4];
    data.T = +firstLine[5];

    data.rides = [];

    for (let i = 0; i < data.N; i++) {
        let line = lines[1 + i].split(' ');

        let ride = new Ride();
        ride.a = +line[0];
        ride.b = +line[1];
        ride.f = +line[2];
        ride.s = +line[3];
        ride.x = +line[4];
        ride.y = +line[5];
        data.rides.push(ride);
    }

    let solution = new Solution();
    solution.rides = [];

    for (let i = 0; i < data.F && i < data.N; i++) {
        let solutionRide = new RideSolution();
        solutionRide.M = 1;
        solutionRide.R = [i];
        solution.rides.push(solutionRide);
    }

    fs.writeFile('out/' + filename + '.out', convertSolutionToFile(solution), function(err) {
        if (err) {
            return console.log(err);
        }

        console.log('The file was saved!');
    });
});

function convertSolutionToFile(solution: Solution): string {
    let output = '';
    if (solution.rides) {
        solution.rides.forEach(ride => {
            output += ride.M;
            if (ride.R) {
                ride.R.forEach(r => {
                    output += ' ' + r;
                });
            }
            output += '\n';
        });
    }
    return output;
}

//forEach write output
filenames.forEach(filename => {});
