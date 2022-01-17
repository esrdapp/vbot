const multiplier = 1e3;

const getRandomInteger = (min, max) => {
    min = min * multiplier;
    max = max * multiplier;
    return Math.floor(Math.floor(Math.random() * (max - min + 1) ) + min) / multiplier;
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    getRandomInteger,
    sleep
}
