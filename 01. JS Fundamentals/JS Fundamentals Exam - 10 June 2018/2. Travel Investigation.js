function solve(arr){
    let companies = arr[0].split(arr[1]);
    let valid = [];
    let invalid =[];
    for(let i = 2; i < arr.length; i++){
        let current = arr[i].toLowerCase();
        if(hasAll(current)){
            valid.push(current);
        }else{
            invalid.push(current);
        }
    }

    if(valid.length > 0){
        console.log('ValidSentences');
        let counter = 1;
        for(let text of valid){
            console.log(`${counter}. ${text}`);
            counter++;
        }
    }
    if(valid.length > 0 && invalid.length > 0){
        console.log('==============================');
    }
    if(invalid.length > 0){
        console.log('InvalidSentences');
        let counter = 1;
        for (let text of invalid){
            console.log(`${counter}. ${text}`);
            counter++;
        }
    }

    function hasAll(text){
        for(let company of companies){
            if(!text.includes(company)){
                return false;
            }
        }
        return true;
    }
}