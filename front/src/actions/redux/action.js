import { combineReducers } from 'redux';
export const Account_Connect = 'Account_Connect';
export const Account_disConnect = 'Account_disConnect';
export const Initial_Connect = 'Initial_Connect';

const initial_wallet_connect ={
                  UserAccountAddr     : '',
                  UserAccountBal      : 0,
                  providers           : null,
                  Service_Fee         : 0,
                  Wen_Bln             : 0,  //default token bln
                  Accounts            : '',
                  WalletConnected     : 'false',
                  AddressUserDetails  : null,
                  tokenAddress        : null,
                  swapFee             : 0,
                  buyerfee            : 0,  //buyer service fee
                  sellerfee           : 0,  // buyer seller fee
                  token_usd_value     : 0,  //Wen_bln $ price
                  currency_usd_value  : 0,  //bnb $ price
                  shareTag            : null ,
                  Listing_Fee         : 0,
                  SingleContract      : null,
                  MultipleContract    : null,
                  load                : "false",
                  Wallet_Type         : ''
}

function wallet_connect_context(state=initial_wallet_connect, action) {
//////("vathutan",state,action)
switch (action.type) {
  case Initial_Connect:
    return {
    ...state,
    ...action.Initial_Connecting
    };
  case Account_Connect:
    return {
    ...state,
    ...action.Account_Detail
    };
  case Account_disConnect:
    return {
    ...state,
    ...action.Account_Detail_Disconnect
    };
  default:
    return state;
}
}
const birdApp = combineReducers({
        wallet_connect_context
      });

      export default birdApp;
