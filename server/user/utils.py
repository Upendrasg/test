
from web3 import Web3
from core.settings import INFURA_PROJECT_ID
def get_wallet_balance(wallet_address=None):
    if not wallet_address:
        raise ValueError("Wallet address must be provided")
    
    # Connect to Ethereum node
    w3 = Web3(Web3.HTTPProvider(f'https://mainnet.infura.io/v3/{INFURA_PROJECT_ID}'))
    try:
        # Get balance in Wei
        balance_wei = w3.eth.get_balance(wallet_address)
        # Convert Wei to Ether
        balance_ether = balance_wei/10**18
        return float(balance_ether)  # Return balance as float
    except Exception as e:
        # Handle exceptions, such as invalid address or connection issues
        return "Invalid wallet address"
