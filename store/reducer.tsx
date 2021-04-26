import * as React from "react"
import { Wallet } from '../@types/types'

export const initialState:IState = {
    wallet: {
        PrivateKey: "init",
        PublicKey: "init",
        Address: "init"
    }
}

// action
export interface IAction { 
    type: 'SET_WALLET',
    payload: Wallet
}

export interface IState{
    wallet: Wallet
}

// reducer
export const reducer = (state: IState, action: IAction):IState => {
    switch (action.type) {
      case 'SET_WALLET':
        return {
            ...state,
            wallet:{
                PublicKey: action.payload.PublicKey,
                PrivateKey: action.payload.PrivateKey,
                Address: action.payload.Address
            }
        }
      default:
        return state;
    }
  }

export const Context = React.createContext<IState|any>(initialState);

export const StoreProvider: React.FC = ({ children }) : JSX.Element =>{
  const [state, dispatch]: [IState, React.Dispatch<IAction>] = React.useReducer(reducer, initialState);
  return (
      <Context.Provider value={{state, dispatch}}>
          {children}
      </Context.Provider>
  )
}