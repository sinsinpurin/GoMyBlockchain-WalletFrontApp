import "axios"
import axios from "axios"
import "./setting"
import {WalletServerPORT,WalletServerDomain} from "./config.js"

import {Wallet} from "../@types/types"

export async function CreateWallet(): Promise<Wallet>{
    var wallet: Wallet = await axios.post(WalletServerDomain + WalletServerPORT + "/wallet").then(
        resposnse => {
            var resWallet : Wallet = {
                PrivateKey : resposnse.data.PrivateKey,
                PublicKey : resposnse.data.PublicKey,
                Address : resposnse.data.Address
            }
            return resWallet
        }
    )
    return wallet
}

export async function SendTransaction(senderPrivateKey:string, recipientAddress:string, senderAddress:string, value:number, senderPublicKey :string): Promise<string>{
    var sig: string = await axios.post(WalletServerDomain + WalletServerPORT + "/transaction",{
    SenderPrivateKey: senderPrivateKey,
    RecipientAddress: recipientAddress,
    SenderAddress: senderAddress,
    Value : String(value),
    SenderPublicKey : senderPublicKey
    }).then(
        resposnse => {
            return resposnse.data
        }
    )
    return sig
}

export async function GetAmount(address: string){
    var amount:number = await axios.get(WalletServerDomain + WalletServerPORT + "/wallet/amount",{
        params:{
            Address: address
        }
    }).then(
        resposnse => {
            return resposnse.data
        }
    )
    return amount
}