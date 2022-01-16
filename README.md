# Volumn Increase Automation Bot

VBOT v.1.0 config file

config file for volume trading bot for uniswap or other forks of uniswap such as PancakeSwap or SushiSwap.

To begin with, the bot will generate a random number between "consecutive_trades_before_switch_min" and "consecutive_trades_before_switch_max" and store this value as variable "consecutive_trades = x"

Next it will generate another random number and store this as a variable for "trade_amount" (between the min max values) and finally it will generate a random number as a "time_delay" variable (between min and max time) before executing the trade at the amount "trade_amount". It will increment the value for "trades_executed"
Once the trade has been executed, the timer will run the amount of time shown in "time_delay", before once again generating another amount value and another time delay value, and repeat the trade execution.

Eventually when "trades_executed" == "consecutive_trades" the bot will switch from buy to sell (or from sell to buy) and the value for "trades_executed" will be reset back to 0 and another random number will be generated for "consecutive_trades"

This process continues over and over, so there will look to be a lot of seemingly random trades for buys and sells, at different times and at different amounts. This helps the token pair being traded on look very natural. 

Bot can be tested on Binance Smart Chain by obtaining free testnet BNB from the faucet https://testnet.binance.org/faucet-smart

You than then convert some of the BNB to token 0 and token 1 in your wallet at the testnet pancakeswap DEX - https://pancake.kiemtienonline360.com/#/swap

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
