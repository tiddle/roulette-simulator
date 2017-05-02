import rouletteCalculator from './roulette-game/roulette-game';

let money = 50;
let historyOfResults = [];

const addToResult = (resultNumber, historyOfResults, betResults) => {
    let output = {
        number: resultNumber,
        colour: rouletteCalculator.calculateColour(resultNumber),
        // colour: 'red',
        even: rouletteCalculator.calculateEvenOrOdd(resultNumber),
        betResults
    };

    // if(historyOfResults && !historyOfResults[historyOfResults.length - 1].highest) {
    //     output.highest = 0;
    // }

    // if(historyOfResults && historyOfResults[historyOfResults.length - 1].highest < money) {
    //     output.highest = money;
    // }

    historyOfResults.push(output);

    return historyOfResults;
}

const calculateWhenToColourBet = (history) => {
   let outcome = history.reduce((acc, curr) => {
       acc[curr.colour]++;
       return acc;
   }, {red: 0, black: 0, green: 0});

   if(outcome.red > 10) {
       return 'black';
   }

   if(outcome.black > 10) {
       return 'red';
   }

   return 'no';
}

const _getHistory = (historyArr) => {
   let historyCopy = historyArr.map((curr) => curr);
   return historyCopy.slice(-20);
}

const calculateWhenToEvenOddBet = (history) => {
    let outcome = history.reduce((acc, curr) => {
        acc[curr.even]++
        return acc;
    }, {odd: 0, even: 0, zero: 0});

    if(outcome.odd > 10) {
        return 'odd';
    }

    if(outcome.even > 10) {
        return 'even';
    }

    return 'no'
}

const simulateGame = (spins) => {
    while(money > 0) {
        let result = generateRouletteNumber();
        let history = _getHistory(historyOfResults);

        // Colour bets
        const colourBet = calculateWhenToColourBet(history);
        const amountToColourBet = colourBet !== 'no' ? calculateAmountToBet(historyOfResults, 'colour') : 0;
        const colourWin = calculateColourWin(result, colourBet, amountToColourBet);
        money += colourWin;

        // Even bets
        const evenBet = calculateWhenToEvenOddBet(history);
        const amountToEvenBet = evenBet !== 'no' ? calculateAmountToBet(historyOfResults, 'even') : 0;
        const evenWin = calculateEvenWin(result, evenBet, amountToEvenBet);
        money += evenWin;

        const betResults = {
            colour: {
                bet: colourBet,
                amount: amountToColourBet,
                win: colourWin
            },
            even: {
                bet: evenBet,
                amount: amountToEvenBet,
                win: evenWin
            }
        };

        console.log('Result: ', result);
        console.log(betResults);
        console.log('Money: ', money);
        addToResult(result, historyOfResults, betResults);

        if(money <= 0) {
            console.log('You lose everything');
            break;
        }
    }
}

const calculateColourWin = (number, betColour, betAmount) => {
    money -= betAmount;
    if(rouletteCalculator.calculateColour(number) === betColour) {
        return betAmount*2;
    } 

    return 0;
}

const calculateEvenWin = (number, betEven, betAmount) => {
    money -= betAmount;
    if(rouletteCalculator.calculateEvenOrOdd(number) === betEven) {
        return betAmount*2;
    }

    return 0;
}

const calculateAmountToBet = (historyArr, type) => {
    let historyCopy = historyArr.map(curr => curr);

    const output = historyCopy.reduceRight((acc, curr) => {
        if(acc.continue) {
            if(curr.betResults[type].win === 0 && curr.betResults[type].bet !== 'no') {
                acc.amount = (acc.amount * 2);
            } else {
                acc.continue = false;
            }
        }

        return acc;
    }, {amount: 1, continue: true});

    return output.amount;    
}

const generateRouletteNumber = () => {
    return Math.floor(Math.random() * (36 + 1));
}

simulateGame(1000);