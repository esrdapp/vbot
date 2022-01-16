const { providers, Contract, Wallet, utils } = require("ethers");
const dotenv = require("dotenv");
const {
    getRandomInteger,
    sleep
} = require("./utils");
const pancakeRouterAbi = require('./abis/PancakeRouter.json');
const token0Abi = require('./abis/WBNB.json');
const token1Abi = require('./abis/USDT.json');

dotenv.config();

const {
    RPC_URL,
    DEX_ROUTER_ADDRESS,
    TOKEN_0_ADDRESS,
    TOKEN_1_ADDRESS,
    WALLET_PRIVATE_KEY,
    CONSECUTIVE_TRADES_BEFORE_SWITCH_MIN,
    CONSECUTIVE_TRADES_BEFORE_SWITCH_MAX,
    TOKEN_0_MIN,
    TOKEN_0_MAX,
    TOKEN_1_MIN,
    TOKEN_1_MAX,
    TIME_BETWEEN_TRADES_MIN,
    TIME_BETWEEN_TRADES_MAX,
} = process.env;

const provider = new providers.JsonRpcProvider(RPC_URL);
const signer = new Wallet(WALLET_PRIVATE_KEY, provider);

const pancakeRouterContract = new Contract(
    DEX_ROUTER_ADDRESS,
    pancakeRouterAbi,
    signer
);

const token0Contract = new Contract(
    TOKEN_0_ADDRESS,
    token0Abi,
    signer
);

const token1Contract = new Contract(
    TOKEN_1_ADDRESS,
    token1Abi,
    signer
);

const SWAP_COMMAND = {
    BUY: "BUY",
    SELL: "SELL",
};

let executedTradesCounter = 0, consecutiveTradesCount = 0;
let exchange = SWAP_COMMAND.SELL;

async function sell(contract, token0, token1, to, amount) {
    const deadline = Math.round((Date.now() + 30 * 1000) / 1000);   // expires in 30s
    
    await contract.swapExactETHForTokens(0, [token0, token1], to, deadline.toString(), { value: utils.parseEther(amount.toString()) });
}

async function buy(contract, token0, token1, to, amount) {
    const deadline = Math.round((Date.now() + 30 * 1000) / 1000);   // expires in 30s
    
    await contract.swapExactTokensForETH(
        utils.parseEther(amount.toString()), 
        '0',
        [token0, token1], 
        to, 
        deadline.toString()
    );
}

async function trade() {
    // if executedTradesCounter is equal to consecutiveTradesCount, then switch buy & sell.
    if (executedTradesCounter == consecutiveTradesCount) {
        // switch token buy & sell
        if (exchange == SWAP_COMMAND.BUY) {
            exchange = SWAP_COMMAND.SELL;       // BNB -> USDT
        } else {
            exchange = SWAP_COMMAND.BUY;        // USDT -> BNB
        }

        // reset
        executedTradesCounter = 0;
        consecutiveTradesCount = getRandomInteger(+CONSECUTIVE_TRADES_BEFORE_SWITCH_MIN, +CONSECUTIVE_TRADES_BEFORE_SWITCH_MAX);
    }

    console.log(`-------------- ${executedTradesCounter + 1} / ${consecutiveTradesCount} --------------`);

    // trade
    if (exchange == SWAP_COMMAND.BUY) {
        // buy
        console.log('Buying...');

        // get allowance of dex contract
        const allowAmount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
        const allowed = await token1Contract.allowance(signer.address, DEX_ROUTER_ADDRESS);
        if (allowed.lt(allowAmount)) {
            await token1Contract.approve(DEX_ROUTER_ADDRESS, allowAmount);
        }
        
        let tradeAmount = getRandomInteger(+TOKEN_1_MIN, +TOKEN_1_MAX);
        await buy(pancakeRouterContract, TOKEN_1_ADDRESS, TOKEN_0_ADDRESS, signer.address, tradeAmount);

        console.log(`${tradeAmount} bought successfully!`);
    } else {
        // sell
        console.log('Selling...');

        let tradeAmount = getRandomInteger(+TOKEN_0_MIN, +TOKEN_0_MAX);
        await sell(pancakeRouterContract, TOKEN_0_ADDRESS, TOKEN_1_ADDRESS, signer.address, tradeAmount);

        console.log(`${tradeAmount} sold successfully!`);
    }

    // increase executed trades counter
    executedTradesCounter++;

    // delay for random seconds
    let delayTime = getRandomInteger(+TIME_BETWEEN_TRADES_MIN, +TIME_BETWEEN_TRADES_MAX);
    console.log(`Waiting ${delayTime}s...`);
    await sleep(delayTime * 1000);
}

async function main() {
    while (true) {
        try {
            await trade();
        } catch (err) {
            console.log(err.message);
            await sleep(60 * 1000);
        }
    }
}

main();
