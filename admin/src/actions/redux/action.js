// import { combineReducers } from 'redux';
// export const Account_Connect = 'Account_Connect';
// export const Account_disConnect = 'Account_disConnect';

// const initial_wallet_connect ={
//         UserAccountAddr:'',
//         // UserAccountBal:0,
//         // providerss:null,
//         // Service_Fee_buyer:0,
//         // Service_Fee_seller:0,
//         // Wen_Bln:0,
//         // Accounts:'',
//         // WalletConnected:'',
//         // AddressUserDetails:null,
//         // tokenAddress:null,
//         // swapFee:0,
//         // currency_convertion: {},
//         // Token_convertion:[],
// }
// console.log("dfbsarbhcgre",initial_wallet_connect)
// function wallet_connect_context(state=initial_wallet_connect, action) {
//         console.log("vathutan",action)
//         switch (action.type) {  
//         case Account_Connect:
//       return {
//         ...state,
//        ...action.Account_Detail
// };
// case Account_disConnect:
//         return {
//           ...state,
//           ...initial_wallet_connect
//   };
//     default:
//       return state;
//   }
// }
// const birdApp = combineReducers({
//         wallet_connect_context
//       });
      
//       export default birdApp;