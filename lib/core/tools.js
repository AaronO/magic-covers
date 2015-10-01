function measure(f) {
    var t1 = Date.now();
    f();
    console.log('Took', (Date.now()-t1)+'ms');
}

exports.measure = measure;
