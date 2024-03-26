
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
  

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return (
    <form onSubmit={submit} className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-lg border-0 transform transition-all hover:scale-105">
<div className="mb-4">
  <label htmlFor="quantity" className="block text-lg font-medium text-gray-700">Quantity</label>
  <input
    name="quantity"
    type="number"
    min="1"
    placeholder="Enter quantity"
    required
    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition duration-150 ease-in-out"
  />
</div>
<button
  disabled={isPending}
  type="submit"
  className={`inline-flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 ${isPending ? 'bg-gray-400' : 'bg-indigo-500 hover:bg-indigo-600'} rounded-md shadow focus:outline-none focus:shadow-outline-indigo disabled:opacity-50`}
>
  {isPending ? 'Confirming...' : 'Mint'}
</button>
<div className="mt-4 space-y-2">
  {hash && <p className="text-sm text-gray-600">Transaction Hash: {hash}</p>}
  {isConfirming && <p className="text-sm text-indigo-600">Waiting for confirmation...</p>}
  {isConfirmed && <p className="text-sm text-green-600">Transaction confirmed.</p>}
  {error && <p className="text-sm text-red-600">Error: {(error as BaseError).shortMessage || error.message}</p>}
</div>
</form>

  );
};