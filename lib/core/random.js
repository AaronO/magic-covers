function rand() {
    return Math.random();
}


function randInt(min, max) {
    if(!max) {
        max = min;
        min = 0;
    }
    return min+Math.floor(rand()*(max-min));
}

function randChoice(array) {
    return array[randInt(array.length)];
}

function shuffle(array) {
    var copy = array.slice();
    fisherYates(copy);
    return copy;
}

function fisherYates( array ){
    var count = array.length;
    var randomnumber;
    var temp;

    while(count) {
        randomnumber = Math.random() * count-- | 0;
        temp = array[count];
        array[count] = array[randomnumber];
        array[randomnumber] = temp
    }
}

module.exports = rand;
module.exports.int = randInt;
module.exports.choice = randChoice;
module.exports.shuffle = shuffle;
