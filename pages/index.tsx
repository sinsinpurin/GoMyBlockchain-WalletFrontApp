import Head from 'next/head'
import styles from '../styles/Home.module.css'

import {GetStaticProps} from "next"

import {CreateWallet, GetAmount, SendTransaction} from "../requests/blockchain"
import { Wallet } from '../@types/types'
import { useState } from 'react'

type Props = {
  wallet : Wallet
}

export default function Home(props: Props) {
  const [recipientAddress, changeRecipientAddress] = useState("")
  const [amount, changeAmount] = useState(0)
  const [sendAmount, changeSendAmount] = useState(0)

  async function sendButtonHundler(senderPrivateKey: string, recipientAddress: string, senderAddress: string, value:number, senderPublicKey: string){
    if(window.confirm("送信しますか？")){
      await SendTransaction(senderPrivateKey, recipientAddress , senderAddress, value, senderPublicKey)
      window.alert("送信しました！")
    }else{
      window.alert("キャンセルされました")
    }
  }

  async function getAmountButtonHundler() {
    var amount:number = await GetAmount(props.wallet.Address)
    changeAmount(amount)
  }

  return (
    <div className="text-center">
      <Head>
        <title>Wallet App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <h1>Wallet</h1>
          <div>amount :{ amount }</div>
          <button onClick={async() => await getAmountButtonHundler()} id="sendMoneyButton" className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Get Amount</button>
          <p>Public Key</p>
          <textarea readOnly defaultValue={props.wallet.PublicKey} name="publicKey" id="publicKey" cols={100} rows={2} className="mt-1 rounded-md border-2 border-blue-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
          <p>Private Key</p>
          <textarea readOnly defaultValue={props.wallet.PrivateKey} name="privateKey" id="privateKey" cols={100} rows={1} className="mt-1 rounded-md border-2 border-blue-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
          <p>Blockchain Address</p>
          <textarea readOnly defaultValue={props.wallet.Address} name="blockchainAddress" id="blockchainAddress"  cols={100} rows={1} className="mt-1 rounded-md border-2 border-blue-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
        </div>
        <div>
          <h1>Send Money</h1>
          <div>
            Address: <input onChange={(e) => changeRecipientAddress(e.target.value)} type="text" name="recipientBlockchainAdress" id="recipientBlockchainAdress" size={50} className="mt-1 rounded-md border-2 border-blue-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
            Amount: <input onChange={(e) => changeSendAmount(Number(e.target.value))} type="text" name="sendAmount" id="sendAmount" className="mt-1 rounded-md border-2 border-blue-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
            <button onClick={async() => await sendButtonHundler(props.wallet.PrivateKey,recipientAddress,props.wallet.Address,sendAmount,props.wallet.PublicKey)} id="sendMoneyButton" className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Send</button>
          </div>
        </div>
      </main>
      <footer>
      </footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async() => {
  var wallet : Wallet = await CreateWallet()
  return{
    props:{
      wallet: wallet
    },
  }
}