function result(input) {
    input = input + '';
    let avg = 0;
    let length = input.length;
    let arr = input;
    for (let i = 0; i < input.length; i++) {
        avg += Number(input[i]);
    }

    while (avg / length <= 5) {
        avg += 9;
        length++;
        arr +=9;
    }
    console.log(arr);
}