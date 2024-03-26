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
    <form onSubmit={submit} className="max-w-md mx-auto my-10 p-5 border rounded-lg shadow-md bg-white">
      <div className="mb-4">
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
        <input
          name="quantity"
          type="number"
          min="1"
          placeholder="Enter quantity"
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        disabled={isPending}
        type="submit"
        className={`inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white ${isPending ? 'bg-gray-500' : 'bg-blue-400 hover:bg-blue-700'} rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50`}
      >
        {isPending ? 'Confirming...' : 'Mint'}
      </button>
      <div className="mt-4">
        {hash && <p className="text-sm text-gray-600">Transaction Hash: {hash}</p>}
        {isConfirming && <p className="text-sm text-blue-600">Waiting for confirmation...</p>}
        {isConfirmed && <p className="text-sm text-green-600">Transaction confirmed.</p>}
        {error && <p className="text-sm text-red-600">Error: {(error as BaseError).shortMessage || error.message}</p>}
      </div>
    </form>
  );
};