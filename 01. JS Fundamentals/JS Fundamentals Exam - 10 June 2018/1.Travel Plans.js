function solve(input) {
    let sum = 0;
    let specCounter = 1;
    let clumCounter = 1;

    for (let prof of input) {
        let splitted = prof.split(' : ');
        let price = Number(splitted[1]);

        switch (splitted[0]){
            case "Programming":
            case "Hardware maintenance":
            case "Cooking":
            case "Translating":
                case "Designing":
                if(price>=200){
                    if (specCounter%2===0) {
                        sum += (price-price*0.20)+200;
                    }
                    else {
                        sum += price-price*0.20;
                    }
                    specCounter++;
                }
                break;
            case "Driving":
            case "Managing":
            case "Fishing":
                case "Gardening": sum += price;break;
            case "Singing":
            case "Accounting":
            case "Teaching":
            case "Exam-Making":
            case "Acting":
            case "Writing":
            case "Lecturing":
            case "Modeling":
                case "Nursing":
                if (clumCounter%2===0) {
                    sum += (price-price*0.05)
                }
                else if (clumCounter%3===0) {
                    sum += (price - price*0.10)
                }
                clumCounter++;
                break;
        }
    }
    console.log("Final sum: " +sum.toFixed(2));
    if (sum>=1000) {
        console.log(`Mariyka earned ${(sum-1000).toFixed(2)} gold more.`);
    }
    else {
        console.log(`Mariyka need to earn ${(1000-sum).toFixed(2)} gold more to continue in the next task.`);
    }


}
