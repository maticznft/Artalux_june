import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { useHistory, useParams, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import config from '../../lib/config'
import axios from "axios";
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

// toaster config
toast.configure();
let toasterOption = config.toasterOption



export default function EditCategory() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [tokenName, settokenName] = useState('');
    const [network, setnetwork] = useState('');
    const [tokenContents, settokenContents] = useState("");
    const [tokenAddress, settokenAddress] = useState("");
    const [ex_img,set_ex_img]=useState('');
    const[ex_name,set_ex_name]=useState('');
    const [ex_last,set_ex_last]=useState('');
    const[ex_list,set_ex_list] = useState('')
    const [wl_img,set_wl_img]=useState('');
    const[wl_name,set_wl_name] = useState('')
    const[date_deploy,set_date_deploy]=useState('');
    const [totalsupply,set_totalsupply]=useState('');
    const[circulating_Supply,set_circulating_Supply] = useState('')
    const [Decimals,set_Decimals]=useState('');
    const[Holders,set_Holders] = useState('')
  
    const { Id } = useParams();
    console.log("shgdhsjghsdfgfsdjfsdfd", Id)
    useEffect(() => {
        if(Id&&Id!=''){
            axios.get(config.API+'/admin/panel/edittokensdatalast/'+Id).
            then((res)=>{
                var data=res.data
              settokenName(data.tokenName)
              settokenAddress(data.tokenAddress)
              settokenContents(data.tokenContents)
              setnetwork(data.network)
              set_date_deploy(data.date_deploy)
              set_totalsupply(data.totalsupply)
              set_circulating_Supply(data.circulating_Supply)
              set_Decimals(data.Decimals)
              set_Holders(data.Holders)     
              set_ex_img(data.ex_img)
              set_ex_name(data.ex_name)
              set_ex_last(data.ex_last)
              set_ex_list(data.ex_list)
              set_wl_img(data.wl_img)
              set_wl_name(data.wl_name)        
             
            })
        }
        else{
            axios.get(config.API+'/admin/panel/gettokensdatalast').
            then((res)=>{
                var data=res.data
              settokenName(data.tokenName)
              settokenAddress(data.tokenAddress)
              settokenContents(data.tokenContents)
              setnetwork(data.network)
              set_date_deploy(data.date_deploy)
              set_totalsupply(data.totalsupply)
              set_circulating_Supply(data.circulating_Supply)
              set_Decimals(data.Decimals)
              set_Holders(data.Holders)             
             
            })
        }
    }, [])

    const handlesubmit = () => {
    
        var formdata=new FormData()
        formdata.append('tokenName',tokenName)
        formdata.append('tokenAddress',tokenAddress)
        formdata.append('tokenContents',tokenContents)
        formdata.append('network',network)
        formdata.append('ex_img',ex_img)
        formdata.append('ex_name',ex_name)
        formdata.append('ex_last',ex_last)
        formdata.append('ex_list',ex_list)
        formdata.append('wl_img',wl_img)
        formdata.append('wl_name',wl_name)

        formdata.append('date_deploy',date_deploy)
        formdata.append('totalsupply',totalsupply)
        formdata.append('circulating_Supply',circulating_Supply)
        formdata.append('Decimals',Decimals)
        formdata.append('Holders',Holders)
         formdata.append('_id',Id?Id:'')

        // formdata.append('createAt',new Date().getTime())
     
        axios.post(config.API+'/admin/panel/bpxtoken/add',formdata)
        .then((data)=>{
            toast.success("You Details added successfully")
            window.location.href=config.Front_URL+'/tokensdata'
        })
        .catch((e)=>{
            // window.location.reload()
        })

    }


    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
     if(false){}
        else{
        switch (name) {
            case 'tokenName':
                settokenName(value)
                break;
            case 'network':
                setnetwork(value)
                break;
            case 'tokenContents':
                settokenContents(value)
                break;
            case 'tokenAddress':
                settokenAddress(value)
                break;
                case 'ex_img':
                    set_ex_img(e.target.files[0])
                    break;
                case 'ex_name':
                    set_ex_name(value)
                    break;
                case 'ex_list':
                    set_ex_list(value)
                    break;
                case 'ex_last':
                    set_ex_last(value)
                    break;
                    case 'wl_img':
                        set_wl_img(e.target.files[0])
                        break;
                    case 'wl_name':
                        set_wl_name(value)
                        break;
                        case 'date_deploy':
                            set_date_deploy(value)
                            break;
                        case 'totalsupply':
                            set_totalsupply(value)
                            break;
                        case 'circulating_Supply':
                            set_circulating_Supply(value)
                            break;
                        case 'Decimals':
                            set_Decimals(value)
                            break;
                            case 'Holders':
                                set_Holders(value)
                                break;
            default:

        }
    }
    };







    return (
        <div>
            <div className="page_header">
                <Button className="btn btn-success mr-3"><Link to="/TokenList">Back</Link></Button>
            </div>
            <GridContainer>

                <GridItem xs={12} sm={12} md={12}>
                    <Card>

                        <form className={classes.form}>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Token Page</h4>

                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Token Name"
                                            name="tokenName"
                                            onChange={(e) => { handleInputChange(e) }}
                                            value={tokenName}

                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>

                                        <CustomInput
                                            labelText="network"
                                            name="network"
                                            onChange={(e) => { handleInputChange(e) }}
                                            value={network}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="tokenContents"
                                            name="tokenContents"
                                            onChange={(e) => { handleInputChange(e) }}
                                            value={tokenContents}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Token Address"
                                            name="tokenAddress"
                                            onChange={(e) => { handleInputChange(e) }}
                                            value={tokenAddress}

                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Date Deployed"
                                            name="date_deploy"
                                            value={date_deploy}
                                            onChange={(e) => { handleInputChange(e) }}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>

                                        <CustomInput
                                            labelText="Total Supply"
                                            name="totalsupply"
                                            onChange={(e) => { handleInputChange(e) }}
                                            value={totalsupply}

                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Circulating Supply"
                                            name="circulating_Supply"
                                            onChange={(e) => { handleInputChange(e) }}
                                            value = {circulating_Supply}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Decimals"
                                            name="Decimals"
                                            onChange={(e) => { handleInputChange(e) }}
                                            value={Decimals}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Holders"
                                            name="Holders"
                                            onChange={(e) => { handleInputChange(e) }}
                                            value = {Holders}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <br/>
                                            <GridContainer>
                                            <h4>Coin listings</h4>
                               </GridContainer>
                                <GridContainer>
                                 
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Exchange Image"
                                            name="ex_img"
                                            // value={ex_img}
                                            onChange={(e) => { handleInputChange(e) }}
                                            type="file"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>

                                        <CustomInput
                                            labelText="Exchange Name"
                                            name="ex_name"
                                            value={ex_name}
                                            onChange={(e) => { handleInputChange(e) }}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Last price"
                                            name="ex_last"
                                            value={ex_last}
                                            onChange={(e) => { handleInputChange(e) }}

                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Listing date"
                                            name="ex_list"
                                            value={ex_list}
                                            onChange={(e) => { handleInputChange(e) }}

                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <br/>
                                            <GridContainer>
                                            <h4>Wallet Support</h4>
                               </GridContainer>
                                <GridContainer>
                                 
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Wallet Image"
                                            name="wl_img"
                                            // value={wl_img}
                                            onChange={(e) => { handleInputChange(e) }}
                                            type="file"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>

                                        <CustomInput
                                            labelText="Wallet Name"
                                            name="wl_name"
                                            value={wl_name}
                                            onChange={(e) => { handleInputChange(e) }}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>

                                </GridContainer>
                                <GridContainer>
                                    
                                        <GridItem xs={12} sm={12} md={3}>
<Button onClick={handlesubmit}>Submit</Button>
                                    </GridItem>
                                </GridContainer>
                                
                            </CardBody>
                            <CardFooter>

                            </CardFooter>
                        </form>
                    </Card>
                </GridItem>
            </GridContainer>

        </div>
    );
}
