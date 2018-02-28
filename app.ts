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

let filenames = ['trending_today.in', 'me_at_the_zoo.in', 'videos_worth_spreading.in', 'kittens.in'];

//forEach file in the folder in
filenames.forEach(filename => {
    let lines = fs.readFileSync('in/' + filename, 'utf-8').split('\n');
});

//forEach write output
filenames.forEach(filename => {
    fs.writeFile('out/' + filename + '.out', {}, function(err) {
        if (err) {
            return console.log(err);
        }

        console.log('The file was saved!');
    });
});
