# DEX Volume Bot (VBot) - Automated Trading Bot

VBOT v.1.0

The bot will trade random amounts (between a min and max value) at random times (between a min and max value) for a random number of consecutive trades, before switching from buy -> sell -> buy -> sell, etc (between a min and max value)

This process continues over and over, trading at different times and at different amounts. This helps increase trade volume on the targetted token pair.

Please note that you would need tokens for both sides of the pair in the wallet associated with the private key that you add to the .env file.

If you were trading between native coins, (e.g BNB on pancakeswap) then you would first need to "wrap" your BNB into wrapped BNB to allow the 
native coin to conform to ERC20 token standards and would therefore have a contract address. Contract addresses are required for both token 0 and token 1 in
the .env file, so any native coin needs to be wrapped.

The following parameters must be added to the .env file:

# RPC endpoint of chain
RPC_URL =           // (for example: https://data-seed-prebsc-1-s1.binance.org:8545 for BSC testnet)

# Dex Router address, e.g. Uniswap/Pancake/Sushi (Pancakeswap)
DEX_ROUTER_ADDRESS =        // (for example: 0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3 is pancakeswap's uniswapV2Router address on BSC testnet)

# Contract address of first token
TOKEN_0_ADDRESS =          // (for example: 0x094616f0bdfb0b526bd735bf66eca0ad254ca81f is the contract address for WBNB on BSC testnet)

# Contract address of second token
TOKEN_1_ADDRESS =          // (for example: 0x7afd064dae94d73ee37d19ff2d264f5a2903bbb0 is the contract address for USDT on BSC testnet)

# Wallet private key
WALLET_PRIVATE_KEY =       // you need to add the private key for the wallet the bot will trade from (remember, the wallet needs funding of token 0 and token 1)

# Minimum amount of trades before bot switches direction from buy/sell
CONSECUTIVE_TRADES_BEFORE_SWITCH_MIN = 

# Maximum amount of trades before bot switches direction from buy/sell
CONSECUTIVE_TRADES_BEFORE_SWITCH_MAX = 

# Minimum amount to trade for token 0
TOKEN_0_MIN = 

# Maximum amount to trade for token 0
TOKEN_0_MAX = 

# Minimum amount to trade for token 1
TOKEN_1_MIN = 

# Maximum amount to trade for token 1
TOKEN_1_MAX = 

# Minimum amount of time (in seconds) between trades
TIME_BETWEEN_TRADES_MIN = 60       // suggest you leave this at a MINIMUM of 60 seconds to allow the trades to complete

# Maximum amount of time (in seconds) between trades
TIME_BETWEEN_TRADES_MAX = 3600
