function result(input) {
    let travelList = new Map();

    for (let destination of input) {
        destination = destination.split(' > ');
        let country = destination[0];
        let city = destination[1];
        let price = Number(destination[2]);
        city = city.replace(city[0], city[0].toUpperCase());

        if (!travelList.has(country)) {
            travelList.set(country, new Map());
            travelList.get(country).set(city, price);
        }
        else if (!travelList.get(country).has(city)) {
            travelList.get(country).set(city, price);
        }
        else if (travelList.get(country).get(city) > price) {
            travelList.get(country).set(city, price);
        }
    }

    function sortCities(country, c1, c2) {
        return travelList.get(country).get(c1) - travelList.get(country).get(c2);
    }

    function sortCountries(c1, c2) {
        return c1.toLowerCase().localeCompare(c2.toLowerCase());
    }

    let countriesSorted = Array.from(travelList.keys()).sort((c1, c2) => sortCountries(c1, c2));
    let toPrint = [];
    for (let country of countriesSorted) {
        let citiesSorted = Array.from(travelList.get(country).keys()).sort((c1, c2) => sortCities(country, c1, c2));

        let toConcate = country + ' -> ';

        for (let city of citiesSorted) {
            toConcate += city + " -> ";
            toConcate += travelList.get(country).get(city) + " ";
        }
        toPrint.push(toConcate);
        toConcate = '';
    }
    toPrint.forEach(l => console.log(l));
}
