
import Indexs from "App";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {Provider} from 'react-redux'
import {store} from './actions/redux/store'
import {UseWalletProvider} from 'use-wallet'
ReactDOM.render(
//   <UseWalletProvider
//   chainId={97}
//   connectors={{
//   }}
// >	
  
  <Router>
  <Provider  store={store}>
    <Indexs />
   </Provider>
  </Router> 
  // </UseWalletProvider>

  ,
  document.getElementById('root')
);