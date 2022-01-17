# DEX Volume Bot (VBot) - Automated Trading Bot

VBOT v.1.0

The bot will trade random amounts (between a min and max value) at random times (between a min and max value) for a random number of consecutive trades, before switching from buy -> sell -> buy -> sell, etc (between a min and max value)

This process continues over and over, trading at different times and at different amounts. This helps increase trade volume on the targetted token pair.

Please note that you would need tokens for both sides of the pair in the wallet associated with the private key that you add to the .env file.

If you were trading between native coins, (e.g BNB on pancakeswap) then you would first need to "wrap" your BNB into wrapped BNB to allow the 
native coin to conform to ERC20 token standards and would therefore have a contract address. Contract addresses are required for both token 0 and token 1 in
the .env file, so any native coin needs to be wrapped.

The following parameters must be added to the .env file:


## your wallet address
wallet_address: 0x0;          // setup a testnet wallet to test

## your wallet private key
private_key: 0x0;             // add wallet private key to test

## the Uniswap/Pancake/Sushi v2 router contract
dex_swap_router: 0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3;  //bsc testnet - pancakeswap router contract (https://tinyurl.com/3nbt7r7k)

## blockchain ID of network you wish to trade on
chain_id: 97;    // bsc testnet

## RPC endpoint of chain
chain_rpc_url: "https://data-seed-prebsc-1-s1.binance.org:8545";    //bsc testnet 

## Chain explorer
chain_block_explorer: "http://testnet.bscscan.com/";     // bsc testnet

## Contract address of first token
token_0_address: 0x094616f0bdfb0b526bd735bf66eca0ad254ca81f;    //WBNB

## Contract address of second token
token_1_address: 0x7afd064dae94d73ee37d19ff2d264f5a2903bbb0;    //USDT

## minimum amount of trades before bot switches direction from buy/sell
consecutive_trades_before_switch_min: 1;

## maximum amount of trades before bot switches direction from buy/sell
consecutive_trades_before_switch_max: 5;

## minimum amount to trade for token 0
token_0_min: 1;

## maximum amount to trade for token 0
token_0_max: 99;

## minimum amount to trade for token 1
token_1_min: 1;

## maximum amount to trade for token 1
token_1_max: 99;

## minimum amount of time (in seconds) between trades
time_between_trades_min: 60;

## maximum amount of time (in seconds) between trades
time_between_trades_max: 3600;
"# vbot" 
