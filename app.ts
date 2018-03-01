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
    constructor(
        public i?: number,
        public a?: number,
        public b?: number,
        public x?: number,
        public y?: number,
        public s?: number,
        public f?: number,
        public distance?: number
    ) {}
}

class Solution {
    constructor(public rides?: RideSolution[]) {}
}

class RideSolution {
    constructor(public M?: number, public R?: number[]) {}
}

class Car {
    constructor(public a?: number, public b?: number, public timeAvailable?: number, public R?: number[]) {}
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
        ride.i = i;
        ride.a = +line[0];
        ride.b = +line[1];
        ride.f = +line[5];
        ride.s = +line[4];
        ride.x = +line[2];
        ride.y = +line[3];
        data.rides.push(ride);
        ride.distance = calculDistanceByRide(ride);
    }

    data.rides.sort((a, b) => {
        return a.s - b.s;
    });

    let cars: Car[] = [];

    let solution = new Solution();
    solution.rides = [];

    for (let i = 0; i < data.F; i++) {
        let car = new Car();
        car.a = 0;
        car.b = 0;
        car.timeAvailable = 0;
        car.R = [];
        let solutionRide = new RideSolution();
        solutionRide.R = car.R;

        solution.rides.push(solutionRide);
        cars.push(car);
    }

    data.rides.forEach((ride, index) => {
        let maxTimeDistance = data.T;
        let selectedCar: Car = null;
        cars.forEach(car => {
            let startTimeOfRide = Math.max(car.timeAvailable + calculDistanceCarToRide(car, ride), ride.s);
            if (startTimeOfRide < maxTimeDistance && car.timeAvailable + calculDistanceCarToRide(car, ride) + ride.distance < data.T) {
                selectedCar = car;
                maxTimeDistance = startTimeOfRide;
            }
        });

        if (selectedCar) {
            selectedCar.R.push(ride.i);
            selectedCar.timeAvailable += calculDistanceCarToRide(selectedCar, ride) + ride.distance;
            selectedCar.a = ride.x;
            selectedCar.b = ride.y;
        }
    });

    fs.writeFile('out/' + filename + '.out', convertSolutionToFile(solution), function(err) {
        if (err) {
            return console.log(err);
        }

        console.log('The file was saved!');
    });
});

function calculDistance(a: number, b: number, x: number, y: number): number {
    return Math.abs(a - x) + Math.abs(b - y);
}

function calculDistanceCarToRide(car: Car, ride: Ride) {
    return calculDistance(car.a, car.b, ride.a, ride.b);
}

function calculDistanceByRide(ride: Ride): number {
    return calculDistance(ride.a, ride.b, ride.x, ride.y);
}

function convertSolutionToFile(solution: Solution): string {
    let output = '';
    if (solution.rides) {
        solution.rides.forEach(ride => {
            output += ride.R.length;
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
