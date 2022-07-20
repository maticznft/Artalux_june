import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { useHistory, useParams, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import isEmpty from '../../lib/isEmpty';
import Web3 from "web3";
import EXCHANGE from 'ABI/ABI.json';
import SINGLE from 'ABI/SINGLE.json';
import MULTIPLE from 'ABI/MULTIPLE.json';
import TRADE from 'ABI/TRADE.json'
import Modal from 'react-modal';
import config from '../../lib/config'
// import { Account_Connect} from "../../reducers"
import '../../index.css'
const useStyles = makeStyles(styles);
const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
};
const customStyles1 = {
    
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minHeight:'50%',
        minWidth:'25%',
        border:'2px',
        borderRadius:'10px',
        borderStyle:'solid', 
        borderColor:'#9c27b0'  
    },
    overlay:{
        zIndex:99
    }
};

// toaster config
toast.configure();
let toasterOption = config.toasterOption

const initialFormValue = {

    "image": "",
    "swapPrice": 0,
    "tokenDesc": "",
    "tokenPrice": 0,
    "tokenCategory": "",
    "likecount": 0,
    "hashValue": "",
    "status": "",
    "deleted": 0,
    "tokenQuantity": 0,
    "balance": 0,
    "contractAddress": "",
    "type": 721,
    "minimumBid": 0,
    "endclocktime": null,
    "clocktime": null,
    "unlockcontent": "",
    "counts": 0,
    "PutOnSale": true,
    "PutOnSaleType": "",
    "ipfsimage": "",
    "tokenCounts": 0,
    "tokenName": "",
    "tokenRoyality": 0,
    "tokenBid": true,
    "tokenOwner": "",
    "tokenCreator": "",
    "timestamp": null,


}

export default function EditServiceFee() {


    const dispatch = useDispatch();

    const classes = useStyles();
    const history = useHistory();
    const [UserAccountAddr, Set_UserAccountAddr] = useState('')
    const [Accounts, Set_Accounts] = useState('')
    const [owner_Get, set_Owner_Get] = useState('')
    const [UserAccountBal, Set_UserAccountBal] = useState(0)
    const [default_service_fee, set_default_service_fee] = useState(0)
    const [default_service_fee0, set_default_service_fee0] = useState(0)
    const [default_service_fee1, set_default_service_fee1] = useState(0)
    const [default_service_fee2, set_default_service_fee2] = useState(0)
    const [default_service_fee11, set_default_service_fee11] = useState(0)
    const [default_service_fee21, set_default_service_fee21] = useState(0)
    const [default_service_fee721, set_default_service_fee721] = useState(0)
    const [default_service_fee1155, set_default_service_fee1155] = useState(0)
    const [default_service_feettrade, set_default_service_feetrade] = useState(0)
    const [ContractCall, setContractCall] = useState(null)
     const [secondary_service_fee, set_secondary_service_fee] = useState('')
    const [primary_service_fee, set_primary_service_fee] = useState('')
    const [tertairy_service_fee, set_tertairy_service_fee] = useState(0)

    const [tertairy_service_fee_Number, set_tertairy_service_fee_Number] = useState('')
    const [secondary_service_fee_Number, set_secondary_service_fee_Number] = useState('')
    const [primary_service_fee_Number, set_primary_service_fee_Number] = useState('')
    const [modalOpen, setmodalopen] = useState(false)

    const [ServiceDisable, setServiceDisable] = useState('start')
    const [ServiceDisable1, setServiceDisable1] = useState('init')
    const [ServiceDisable2, setServiceDisable2] = useState('init')
    const [ServiceDisable3, setServiceDisable3] = useState('init')
    const [seller__fee,set_seller__fee]=useState(0)
    const[buyer__fee,set_buyer__fee]=useState(0)
    const { Id } = useParams();
    console.log("shgdhsjghsdfgfsdjfsdfd", Id)
    useEffect(() => {
        getConnect();
        getserviceFee();

    }, [])

    window.onbeforeunload = function (e) {
        e = e || window.event;
    
        if (e) {
            if(default_service_fee721 == default_service_fee1155)
            {
                if(default_service_fee1155 == default_service_feettrade)
                {
                    //alert('done')
                }
                else{
                    e.returnValue = 'Please Work2';
                }
            }
            else{
                e.returnValue = 'Please Work2';
            }
        }
        if(default_service_fee721 == default_service_fee1155)
        {
            if(default_service_fee1155 == default_service_feettrade)
            {
                //alert('done')
            }
            else{
                return 'Sure?';
            }
        }
        else{
            return 'Sure?';
        }
    
        
    };

    const getserviceFee=async()=>{
            var web3=new Web3(config.BNBProvider)
            var contractCall = new web3.eth.Contract(SINGLE, config.singleContract)
            var ownerGet = await contractCall.methods.owner().call()
            var ownget = String(ownerGet).toLowerCase();
            set_Owner_Get(ownget)
            var servicefee = await contractCall.methods.getServiceFee().call()
            console.log("Service fee 12", servicefee)
            set_default_service_fee(servicefee[0] / 1e18)
            set_default_service_fee0(servicefee[1] / 1e18)
            set_buyer__fee(servicefee[0] / 1e18)
            set_seller__fee(servicefee[1] / 1e18)
            var contractCallMul = new web3.eth.Contract(MULTIPLE, config.multipleContract)
            var servicefee1 = await contractCallMul.methods.getServiceFee().call()
            console.log("Service fee", servicefee1)
            set_default_service_fee1(servicefee1[0] / 1e18)
            set_default_service_fee11(servicefee1[1] / 1e18)
            // var contractCallTrade = new web3.eth.Contract(TRADE, config.trade)
            // var servicefee2 = await contractCallTrade.methods.getServiceFee().call()
            // console.log("Service fee", servicefee2)
            // set_default_service_fee2(servicefee2[0] / 1e18)
            // set_default_service_fee21(servicefee2[1] / 1e18)
    }

    const getConnect = async () => {
        if (window.ethereum) {
            var web3 = new Web3(window.ethereum)
            if (web3 !== undefined) {
                await window.ethereum.enable()
                    .then(async function () {
                        const web3 = new Web3(window.web3.currentProvider)
                        if (window.web3.currentProvider.networkVersion == config.networkVersion) {
                            if (window.web3.currentProvider.isMetaMask === true) {
                                if (window.web3 && window.web3.eth && window.web3.eth.defaultAccount) {
                                    var currAddr = window.web3.eth.defaultAccount;
                                    var CurAddr = String(currAddr).toLowerCase();
                                    Set_UserAccountAddr(CurAddr);
                                    var result = await web3.eth.getAccounts()
                                    var setacc = result[0];
                                    console.log('Account :', setacc);
                                    Set_Accounts(setacc);    
                                    
                                    

                                    // dispatch({
                                    //     type: Account_Connect,
                                    //     Account_Detail: {
                                    //       UserAccountAddr: setacc,
                                    //       //providerss: provider,
                                    //      // UserAccountBal: balance,
                                    //     //   WalletConnected: "true",
                                    //     //   Accounts: setacc,
                                    //     //  AddressUserDetails: respval,
                                    //     //   Wen_Bln: wenbl
                                    //     }
                                       
                                    //   })


                                   
                                }
                            }
                        }
                        else {
                            toast.warning("Please Connect Wallet", toasterOption);
                        }
                    })
            }
        }
    }

    const onChangeFUnc = async (e) => {
        var val = e.target.id
        console.log("idssss", val)
        setServiceDisable('start')
        switch (val) {

            case 'servicefeecheck1':
                if (e.target.value < 10 || e.target.value > 0) {
                        set_seller__fee(e.target.value)
                   }
                else {
                        set_seller__fee(0)
                    setServiceDisable1('error')
                }
                break;
                case 'servicefeecheck':
                        if (e.target.value < 10 || e.target.value > 0) {
                                set_buyer__fee(e.target.value)
                           }
                        else {
                                set_buyer__fee(0)
                            setServiceDisable1('error')
                        }
                        break;
             }


    }
    const serfeeall = () => {
        setmodalopen(true)
    }
    const EditServiceFeesOnly721 = async (e) => {
            //alert("in")
            console.log("buyer__fee+seller__fee",buyer__fee,seller__fee,buyer__fee+seller__fee)
        if ((Number(buyer__fee)+Number(seller__fee)) && (Number(buyer__fee)+Number(seller__fee)) != 0 && (Number(buyer__fee)+Number(seller__fee)) < 10) {
                //alert("in2")
            setServiceDisable1('process')
            var web3 = new Web3(window.ethereum)
            var contractCall = new web3.eth.Contract(SINGLE, config.singleContract)
            console.log("set Servic Fee ", typeof parseFloat((buyer__fee+seller__fee)))
            var fees =web3.utils.toWei(String((Number(buyer__fee)+Number(seller__fee))))
            await contractCall
                .methods
                .setServiceValue((web3.utils.toWei(String(buyer__fee))),web3.utils.toWei(String(seller__fee)))
                .send({ from: Accounts })
                .then(async () => {
                    setServiceDisable1('done')
                    if(ServiceDisable2 != 'done')
                    {
                    setServiceDisable2('kk')
                    }
                    if(ServiceDisable3 != 'done')
                    {
                    setServiceDisable3('kk')
                    }
                    var servicefee = await contractCall.methods.getServiceFee().call()
                    console.log("Service fee", servicefee)
                    set_default_service_fee721(servicefee / 1e18)
                })
                .catch(() => {
                    setServiceDisable1('try')
                })

        }
    }
    const EditServiceFeesOnly1155 = async (e) => {
        if ((Number(buyer__fee)+Number(seller__fee)) && (Number(buyer__fee)+Number(seller__fee)) != 0 && (Number(buyer__fee)+Number(seller__fee)) < 10) {
                setServiceDisable2('process')
            var web3 = new Web3(window.ethereum)
            var contractCall = new web3.eth.Contract(MULTIPLE, config.multipleContract)
            var fees =web3.utils.toWei(String((buyer__fee+seller__fee)))
            await contractCall
                .methods
                .setServiceValue((web3.utils.toWei(String(buyer__fee))),web3.utils.toWei(String(seller__fee)))

                .send({ from: Accounts })
                .then(async () => {
                    if(ServiceDisable1 != 'done')
                    {
                    setServiceDisable1('kk')
                    }
                    if(ServiceDisable3 != 'done')
                    {
                    setServiceDisable3('kk')
                    }
                    setServiceDisable2('done')
                    var servicefee = await contractCall.methods.getServiceFee().call()
                    console.log("Service fee", servicefee)
                    set_default_service_fee1155(servicefee / 1e18)
                })
                .catch(() => {
                    setServiceDisable2('try')
                })

        }
    }
    const EditServiceFeesOnlytrade = async (e) => {
        if ((Number(buyer__fee)+Number(seller__fee)) && (Number(buyer__fee)+Number(seller__fee)) != 0 && (Number(buyer__fee)+Number(seller__fee)) < 10) {
                setServiceDisable3('process')
            var web3 = new Web3(window.ethereum)
            var contractCall = new web3.eth.Contract(TRADE, config.trade)
            console.log("set Servic Fee ", typeof parseFloat(default_service_fee))
            var fees =web3.utils.toWei(String((buyer__fee+seller__fee)))
            await contractCall
                .methods
                .setServiceValue((web3.utils.toWei(String(buyer__fee))),web3.utils.toWei(String(seller__fee)))
                .send({ from: Accounts })
                .then(async () => {
                    if(ServiceDisable1 != 'done')
                    {
                    setServiceDisable1('kk')
                    }
                    if(ServiceDisable2 != 'done')
                    {
                    setServiceDisable2('kk')
                    }
                    setServiceDisable3('done')
                    var servicefee = await contractCall.methods.getServiceFee().call()
                    console.log("Service fee", servicefee)
                    set_default_service_feetrade(servicefee / 1e18)
                })
                .catch(() => {
                    setServiceDisable3('try')
                })

        }
    }
  
    const customStyles2 = "text-danger"
const disconnect=()=>{
        Set_Accounts('')
}

    return (
        <div>
               
            <div className="page_header">
                <button className="btn btn-success mr-3"><Link to="/">Back</Link></button>
                   <Button className="btn btn-success" onClick={()=>Accounts==''?getConnect():disconnect()}><Link to="#">{Accounts!=""?Accounts:"Connect"}</Link></Button>
         
            </div>
            <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <form className={classes.form}>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>View Service Fee <span className="font-weight-bold">(All THREE must be SAME)</span>   Note - This process take <span className="font-weight-bold">Three Transaction</span> Please Confirm One by One</h4>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>

                                    <GridItem xs={12} sm={12} md={3} >
                                    <div className="servicemod border">
                                    <p className="text-center">Buyer Fee-{default_service_fee}%</p>
                                    <p className="text-center">Seller Fee-{default_service_fee0}%<span className="sertext"> Service fee in 721</span></p>
                                    </div>
                                    </GridItem>
                                        <GridItem xs={12} sm={12} md={3} >
                                        <div className="servicemod border">
                                        <p className="text-center">Buyer Fee - {default_service_fee1}%</p>
                                    <p className="text-center">Seller Fee - {default_service_fee11}%<span className="sertext"> Service fee in 1155</span></p>
                                    </div>
                                    </GridItem>
                                        {/* <GridItem xs={12} sm={12} md={3} >
                                        <div className="servicemod border">
                                        <p className="text-center">Buyer Fee - {default_service_fee2}%</p>
                                    <p className="text-center">Seller Fee - {default_service_fee21}%<span className="sertext"> Service fee in Trade</span></p> */}
                                    {/* </div>
                                    </GridItem> */}
                                        <GridItem xs={12} sm={12} md={4} >
                                        <CustomInput
                                            labelText="Buyer Service Fee"
                                            id="servicefeecheck"
                                            value={buyer__fee || ""}
                                            onChange={(e) => onChangeFUnc(e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        {buyer__fee == 0 && <span className="text-danger">Check service fee</span>}
                                        <CustomInput
                                            labelText="Seller Service Fee"
                                            id="servicefeecheck1"
                                            value={seller__fee}
                                            onChange={(e) => onChangeFUnc(e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        {seller__fee == 0 && <span className="text-danger">Check service fee</span>}

                                    </GridItem>
                                  
                                </GridContainer>

                                {UserAccountAddr && UserAccountAddr == owner_Get &&
                                        <GridItem xs={12} sm={12} md={3} style={{ marginTop: 20 }}>
                                            <Button color="primary" onClick={()=> serfeeall()}>
                                                Edit Service Fee
                                            </Button>
                                            {/* <Button color="primary" onClick={EditServiceFeesOnly}>Edit Service Fee</Button> */}
                                        </GridItem>}
                                <br />

                            </CardBody>

                        </form>
                    </Card>
                </GridItem>
            </GridContainer>
            </div>
            <Modal
                isOpen={modalOpen}
                style={customStyles1}
                contentLabel="Example Modal"
            >
                <p className="text-center">Refresh Page to Close</p>
                <p className="text-center text-danger font-weight-bold">All Three Must Be Same</p>
               <div className="servicemod">
                   <p className="text-center"> Service fee<span className="sertext"> Buyer Fee - {buyer__fee}% And Seller Fee - {seller__fee}%</span></p>
                   <button
                   disabled={(ServiceDisable1 == 'process') || (ServiceDisable1 == 'done') || (ServiceDisable == 'error')}
                   onClick={EditServiceFeesOnly721}
                    >
                   {ServiceDisable1 == 'init' && ` Buyer Fee - ${default_service_fee}% to ${buyer__fee}% And   Seller Fee - ${default_service_fee0}% to ${seller__fee}% Service Fee in 721`}
                   {ServiceDisable1 == 'error' && 'Error.. Check Input Fields'}
                   {((ServiceDisable2 == 'done' || ServiceDisable3 == 'done') && (ServiceDisable1 != 'process' && ServiceDisable1 != 'done')) && `Must Edit Service Fee ${default_service_fee0}% to ${default_service_fee}% in 721`}
                   {ServiceDisable1 == 'process' && 'In-Progress'}
                   {ServiceDisable1 == 'done' && `Buyer Fee -  ${(Number(buyer__fee))}%  Seller Fee -  ${(Number(seller__fee))}% Service Fee in 721`}
                   {ServiceDisable1 == 'try' && 'Try-Again'}
                   </button>
                   <button
                    disabled={(ServiceDisable1 == 'init') || (ServiceDisable1 == 'process') || (ServiceDisable2 == 'process') || (ServiceDisable2 == 'done') || (ServiceDisable == 'error')}
                    onClick={EditServiceFeesOnly1155}
                   >
                    {ServiceDisable2 == 'init' && ` Buyer Fee - ${default_service_fee1}% to ${buyer__fee}% And   Seller Fee - ${default_service_fee11}% to ${seller__fee}% Service Fee in 1155`}
                   {ServiceDisable2 == 'error' && 'Error.. Check Input Fields'}
                   {((ServiceDisable1 == 'done' || ServiceDisable3 == 'done') && (ServiceDisable2 != 'process' && ServiceDisable2 != 'done')) && `Must Edit Service Fee ${default_service_fee0}% to ${default_service_fee}% in 1155`}
                   {ServiceDisable2 == 'process' && 'In-Progress'}
                   {ServiceDisable2 == 'done' && `Buyer Fee -  ${(Number(buyer__fee))}%  Seller Fee -  ${(Number(seller__fee))}% Service Fee in 1155`}
                   {ServiceDisable2 == 'try' && 'Try-Again'}
                   </button>
                   {/* <button
                    disabled={(ServiceDisable2 == 'init') || (ServiceDisable2 == 'process')|| (ServiceDisable3 == 'process') || (ServiceDisable3 == 'done') || (ServiceDisable == 'error')}
                    onClick={EditServiceFeesOnlytrade}
                   >
                    {ServiceDisable3 == 'init' && ` Buyer Fee - ${default_service_fee2}% to ${buyer__fee}% And   Seller Fee - ${default_service_fee21}% to ${seller__fee}% Service Fee in Trade`}
                   {ServiceDisable3 == 'error' && 'Error.. Check Input Fields'}
                   {((ServiceDisable1 == 'done' || ServiceDisable2 == 'done')&& (ServiceDisable3 != 'process' && ServiceDisable3 != 'done')) &&  `Must Edit Service Fee ${default_service_fee0}% to ${default_service_fee}% in Trade`}
                   {ServiceDisable3 == 'process' && 'In-Progress'}
                   {ServiceDisable3 == 'done' && `Buyer Fee -  ${(Number(buyer__fee))}%  Seller Fee -  ${(Number(seller__fee))}% Service Fee in Trade`}
                   {ServiceDisable3 == 'try' && 'Try-Again'}
                   </button> */}
               </div>
            </Modal>
        </div>
    );
}
