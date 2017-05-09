# Roulette Simulator

**By Carlo Cruz**

## Why?

This code is for testing a theory I had with roulette. Basically the theory was that if one colour came up more often
then the other, then there would be a higher chance of the other colour appearing.

Example: If the previous spins were `red`, `black`, `red`, `red`, there would be a higher chance of black appearing.

This is an implementation of that theory. This script will take the previous 20 spin results and calculate which colour
would have a better chance of appearing.

I also took it a step further and did it for `odds` and `evens`, which in theory should have the same odds.

One other step I took was that if I did not make a correct bet, I would double my bet the next time around.

Example: If the previous spins were `RRRRRR` I would make a bet on `black`. If the next spin was `red` then I would
double my previous bet. If the next spin was also red, I would double again. This would ensure that when I did eventually
win, I would come out ahead.

Assumption:
- Roulette table is no limits
- Start with $500

## Conclusion

This doesn't work like I theorised. Assuming that the only result are `red` and `black` and no `0` or `00` and the
previous spins are `red`, `red`, `red`, `red`, `red`, `red`. The possible results are `RRRRRR - R` and `RRRRRR - B` 
making the odds 50-50. Even if the odds of getting 7 `reds` in a row is 1 in 128, the odds of getting 6 `reds` 
and a `black` is also 1 in 128.

The doubling of the bet also ran into some issue because if you lost 8 times in a row, you would be betting `$256`
and if you lost that, then you would be at `$512`, which would be over your starting amount. This also proves a problem
on real tables as they generally have bet limits.


## Usage

`npm install`
`npm start`
