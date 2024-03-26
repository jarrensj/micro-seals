'use client'

import * as React from 'react'
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { abi } from '../public/abi'
 
export default function MintForm() {
  const { 
    data: hash,
    error, 
    isPending, 
    writeContract 
  } = useWriteContract() 

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const quantity = formData.get('quantity') as string;
  
    const etherAmountPerItem = 0.003;
    const totalEtherAmount = Number(quantity) * etherAmountPerItem;
    const totalWei = BigInt(totalEtherAmount * 1e18);
  
    writeContract({
      address: '0x9f68dfd978905e6c7734b2e48f085485452afa5d',
      abi,
      functionName: 'mintPublic',
      args: [BigInt(quantity)],
      value: BigInt(totalWei.toString()),
    });
  } 
  

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    }) 

  return (
    <form onSubmit={submit}>
      <input name="quantity" placeholder="1" required />
      <button 
        disabled={isPending} 
        type="submit"
      >
        {isPending ? 'Confirming...' : 'Mint'} 
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>} 
      {isConfirmed && <div>Transaction confirmed.</div>} 
      {error && ( 
        <div>Error: {(error as BaseError).shortMessage || error.message}</div> 
      )} 
    </form>
  )
}