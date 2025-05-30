import { createWalletClient, http, parseEther, createPublicClient, formatEther, encodeFunctionData } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { bsc } from 'viem/chains'
import { exit } from 'process';

// Contract addresses
const STAKE_CONTRACT_ADDRESS = '0xcC48B55F6c16d4248EC6D78c11Ba19c1183Fe0F7'
const SOON_TOKEN_ADDRESS = '0xb9E1Fd5A02D3A33b25a14d661414E6ED6954a721'

// ABI for the deposit function
const stakeABI = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "assets",
                type: "uint256"
            },
            {
                internalType: "address",
                name: "receiver",
                type: "address"
            }
        ],
        name: "deposit",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    }
] as const

// ABI for the approve function
const tokenABI = [
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            }
        ],
        name: "approve",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    }
] as const

async function main() {
    console.log('🚀 Starting SOON staking script...')
    console.log('📝 Contract Address:', STAKE_CONTRACT_ADDRESS)
    console.log('📝 SOON Token Address:', SOON_TOKEN_ADDRESS)

    // Replace with your private key
    const privateKey = 'YOUR_PRIVATE_KEY'
    console.log('🔑 Using account from private key...')
    const account = privateKeyToAccount(privateKey)
    console.log('👤 Account address:', account.address)

    // Create a custom transport with a reliable RPC endpoint
    const transport = http('https://bsc-dataseed.binance.org/', {
        retryCount: 3,
        retryDelay: 1000
    })

    console.log('⚙️ Initializing wallet client...')
    // Create wallet client with custom chain configuration
    const walletClient = createWalletClient({
        account,
        chain: bsc,
        transport
    })
    console.log('✅ Wallet client initialized')

    console.log('⚙️ Initializing public client...')
    // Create public client with custom chain configuration
    const publicClient = createPublicClient({
        chain: bsc,
        transport
    })
    console.log('✅ Public client initialized')

    try {
        // Amount to deposit (in wei)
        const depositAmount = parseEther('1.0') // 1 SOON token
        console.log('💰 Deposit amount:', formatEther(depositAmount), 'SOON')

        // Get current gas price
        const gasPrice = await publicClient.getGasPrice()
        console.log('⛽ Current gas price:', formatEther(gasPrice), 'BNB')

        // First approve the staking contract to spend our tokens
        console.log('📝 Approving staking contract to spend SOON tokens...')

        // Encode the approve function call
        const approveData = encodeFunctionData({
            abi: tokenABI,
            functionName: 'approve',
            args: [STAKE_CONTRACT_ADDRESS, depositAmount]
        })

        // Get the nonce for the transaction
        const nonce = await publicClient.getTransactionCount({
            address: account.address
        })

        // Prepare the transaction
        const approveTx = {
            to: SOON_TOKEN_ADDRESS as `0x${string}`,
            data: approveData,
            gasPrice,
            nonce,
            chain: bsc,
            account
        }

        // Send the transaction
        console.log('📝 Sending approval transaction...')
        const approveHash = await walletClient.sendTransaction(approveTx)
        console.log('🔗 Approval transaction hash:', approveHash)

        console.log('⏳ Waiting for approval confirmation...')
        const approveReceipt = await publicClient.waitForTransactionReceipt({ hash: approveHash })
        console.log('✅ Approval confirmed!')
        console.log('📊 Approval details:')
        console.log('   - Gas used:', approveReceipt.gasUsed.toString())
        console.log('   - Block number:', approveReceipt.blockNumber)
        console.log('   - Status:', approveReceipt.status ? 'Success' : 'Failed')

        // Now proceed with the deposit
        console.log('📡 Preparing deposit transaction...')

        // Encode the deposit function call
        const depositData = encodeFunctionData({
            abi: stakeABI,
            functionName: 'deposit',
            args: [depositAmount, account.address]
        })

        // Get the new nonce for the deposit transaction
        const depositNonce = await publicClient.getTransactionCount({
            address: account.address
        })

        // Prepare the deposit transaction
        const depositTx = {
            to: STAKE_CONTRACT_ADDRESS as `0x${string}`,
            data: depositData,
            gasPrice,
            nonce: depositNonce,
            chain: bsc,
            account
        }

        // Send the deposit transaction
        console.log('📝 Sending deposit transaction...')
        const depositHash = await walletClient.sendTransaction(depositTx)
        console.log('🔗 Deposit transaction hash:', depositHash)

        console.log('⏳ Waiting for deposit confirmation...')
        const depositReceipt = await publicClient.waitForTransactionReceipt({ hash: depositHash })
        console.log('✅ Deposit confirmed!')
        console.log('📊 Deposit details:')
        console.log('   - Gas used:', depositReceipt.gasUsed.toString())
        console.log('   - Block number:', depositReceipt.blockNumber)
        console.log('   - Status:', depositReceipt.status ? 'Success' : 'Failed')

    } catch (error: any) {
        console.error('❌ Error occurred:')
        console.error('   - Message:', error?.message || 'Unknown error')
        console.error('   - Stack:', error?.stack || 'No stack trace available')
        throw error
    }
}

console.log('📋 Script started')
main()
    .then(() => {
        console.log('✨ Script completed successfully')
        exit(0)
    })
    .catch((error: any) => {
        console.error('💥 Script failed with error:', error?.message || 'Unknown error')
        exit(1)
    }) 