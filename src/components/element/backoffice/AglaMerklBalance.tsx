import { Box, Button, Input } from "packages/dappkit/src";
import { useWalletContext } from "packages/dappkit/src/context/Wallet.context";
import { useState } from "react";
import { ZyfiService } from "src/api/services/zyfi.service";
import { createWalletClient, custom, encodeFunctionData, parseAbi } from "viem";
import { useSendTransaction, useWalletClient, useWriteContract } from "wagmi";
import { getTransactionCount } from '@wagmi/core'
import { eip712WalletActions, zksync } from "viem/zksync";

export default function AglaMerklBalance() {
    const [amount, setAmount] = useState(0n);
    const { address: user, config } = useWalletContext();
    const { writeContract} = useWriteContract();
    const { sendTransaction } = useSendTransaction();
    const {} = useWalletClient();

    async function mint() {
        if (!user) return;

        const data = encodeFunctionData({abi: parseAbi([
            "function mint(address account, uint256 amount) external",
        ]), functionName: "mint", args: [user, amount]})
        const walletClient = createWalletClient({ 
            chain: zksync, 
            transport: custom(window.ethereum!), 
          }).extend(eip712WalletActions()) 

        const check = await ZyfiService.wrapTx({data, from: user, to: "0xCe59e272946458dA50C36Ca1E731ED6C5752669F"});
        const nonce = await getTransactionCount(config, {
            address: user,
          });

        const a = walletClient.sendTransaction({
            account: user,
            to: check.txData.to,
            value: BigInt(check.txData.value!),
            chain: zksync,
            gas: BigInt(check.txData.gasLimit),
            gasPerPubdata: BigInt(check.txData.customData.gasPerPubdata),
            maxFeePerGas: BigInt(check.txData.maxFeePerGas),
            maxPriorityFeePerGas: BigInt(0),
            data: check.txData.data,
            paymaster: check.txData.customData.paymasterParams.paymaster,
            paymasterInput: check.txData.customData.paymasterParams.paymasterInput,
            nonce,
        })
        
        console.log("CHECK", check, a);
        
    }
    

    return <Box>
        <Input.BigInt base={6} state={[amount, setAmount]}/>
        <Button onClick={mint}>Mint</Button>
    </Box>
}