
import React, {useEffect,useState} from "react";
import { Link ,useHistory} from "react-router-dom";
import Countdown from "react-countdown";
import config from '../../lib/config';
import isEmpty from '../../lib/isEmpty';
import Avatars from "views/Avatar";
import moment from 'moment'
import video from 'video.js';
import ReactPlayer  from 'react-player'
import profile from '../../assets/images/small-profile.png'
import ConnectWallet from "./Connect-Wallet";

export default function Convert1(props) {
        const [ UserAccountAddr, Set_UserAccountAddr] = React.useState('');
        const [ UserAccountBal, Set_UserAccountBal] = React.useState(0);
        const [ WalletConnected, Set_WalletConnected] = React.useState(false);
        const [ Accounts, Set_Accounts] = React.useState('');
        const [ AddressUserDetails, Set_AddressUserDetails] = useState({});
        const [ Service_Fee,set_Service_Fee] = useState(0);
        const[ Wen_Bln,set_Wen_Bln]=useState(0);
        const[ val,set_val]=useState('')
        // const [convertVal, setConvertVal] = React.useState(0);
        const AfterWalletConnected=()=>{

        }
        var history=useHistory();
        var {
        item,convertVal
        } = props;

     


    return (
       <>
        {/* <ConnectWallet
        Set_UserAccountAddr={Set_UserAccountAddr}
        Set_UserAccountBal={Set_UserAccountBal}
        Set_WalletConnected={Set_WalletConnected}
        Set_AddressUserDetails={Set_AddressUserDetails}
        Set_Accounts={Set_Accounts}
        WalletConnected={WalletConnected}
        set_Service_Fee={set_Service_Fee}
        Service_Fee={Service_Fee}
        AfterWalletConnected={AfterWalletConnected}
        Wen_Bln={Wen_Bln}
        set_Wen_Bln={set_Wen_Bln}
        setConvertVal={setConvertVal}
        convertVal={convertVal}
      />  
        */}
     

    {/* <> {item/convertVal}</> */}
                <> {item > 0
              ?  Number(item*convertVal).toFixed(2)
              :  Number(item/convertVal).toFixed(2)}</>
                
       


      </>     
    )
}
