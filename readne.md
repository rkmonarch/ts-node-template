# SOON Staking Script

A TypeScript script to automatically stake SOON tokens and receive gSOON rewards on BSC (Binance Smart Chain).

## What This Script Does

This script helps you stake your SOON tokens and receive gSOON tokens in return. When you stake SOON, you get gSOON (liquid staking tokens) that earn 33,000% APY rewards. It handles both the token approval and deposit transactions automatically.

## Features

- ✅ Automatically approves SOON tokens for staking
- ✅ Stakes your SOON tokens and receives gSOON in return
- ✅ Shows transaction details and confirmation
- ✅ Error handling and retry logic
- ✅ Gas price optimization

## Prerequisites

- Node.js installed on your computer
- SOON tokens in your BSC wallet
- BNB for gas fees
- Your wallet private key

## Installation

1. Clone or download this script
2. Install dependencies:
```bash
npm install viem
```

## Setup

1. Open the script file
2. Replace `'YOUR_PRIVATE_KEY'` with your actual wallet private key
3. Adjust the deposit amount if needed (default is 1 SOON token):
```typescript
const depositAmount = parseEther('1.0') // Change this amount
```

## How to Run

```bash
npx tsx script.ts
```

or if you have ts-node installed:

```bash
ts-node script.ts
```

## Contract Addresses

- **Staking Contract**: `0xcC48B55F6c16d4248EC6D78c11Ba19c1183Fe0F7`
- **SOON Token**: `0xb9E1Fd5A02D3A33b25a14d661414E6ED6954a721`
- **Network**: BSC (Binance Smart Chain)

## What Happens When You Run This

1. **Approval**: First approves the staking contract to spend your SOON tokens
2. **Deposit**: Then deposits your SOON tokens and you receive gSOON tokens in return
3. **Confirmation**: Waits for both transactions to confirm
4. **Results**: Shows transaction hashes and gas usage

## Security Notes

⚠️ **Important Security Tips:**

- **Never share your private key**
- **Test with small amounts first**
- **Keep your private key secure**
- **Double-check contract addresses**

## Troubleshooting

**Common Issues:**

- **Insufficient BNB**: Make sure you have BNB for gas fees
- **Insufficient SOON**: Check your SOON token balance
- **Network Issues**: The script will retry failed requests
- **Wrong Network**: Ensure you're on BSC mainnet

**Error Messages:**

- `Insufficient funds`: You need more BNB for gas or more SOON tokens
- `Transaction failed`: Check your wallet balance and try again
- `Network error`: Wait a moment and retry

## Benefits of Staking SOON

- 🚀 **33,000% APY** rewards
- 💰 **Free trial funds** for simpfor.fun copy trading
- 🎁 **Future airdrops** and NFT drops
- 💧 **Liquid staking** - trade gSOON anytime
- ⚡ **Automatic rewards** - no manual claiming needed

## Support

If you need help:
- Check the BSC explorer for your transactions
- Verify contract addresses on the official SOON website
- Make sure you have the latest version of Node.js

## Disclaimer

This script is provided as-is. Always verify contract addresses and test with small amounts first. Never share your private keys.