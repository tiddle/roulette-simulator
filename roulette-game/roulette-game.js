const calculateColour = (number) => {
    if(number <= 10) {
        return _evenBlack(number);
    }

    if(number <= 18) {
        return _evenRed(number)
    }

    if(number <= 28) {
        return _evenBlack(number);
    }

    if(number <= 36) {
        return _evenRed(number)
    }

    return green;
}

const _evenRed = (number) => {
    if(number % 2 === 0) {
        return 'red';
    }

    return 'black';
}

const _evenBlack = (number) => {
    if(number % 2 === 0) {
        return 'black';
    }

    return 'red';
}

const calculateEvenOrOdd = (number) => {
    if(number === 0) {
        return 'zero';
    }

    if(number%2 === 0) {
        return 'even';
    }

    return 'odd';


}

const rouletteCalculator = {
    calculateColour,
    calculateEvenOrOdd
}

export default rouletteCalculator;