import ConnectWallet from "@/components/ConnectWallet";
import Image from "next/image";
import MintForm from "@/components/MintForm"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">sup</h1>
      <ConnectWallet />
      <MintForm />
    </main>
  );
}
