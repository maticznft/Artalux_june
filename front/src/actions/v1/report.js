import axios from "axios";
import config from '../../lib/config';


export const reportFunc = async (postdata) => {
  ////console..log("check allsssss",postdata)
    try {
      let resp = await axios({
        'method': 'post',
        'url'  :`${config.vUrl}/token/report/reportFunc`,
        data:postdata
       
      });
      return {
        data: resp.data
      }
    }
    catch (err) {
    }
  }

  
export const sociallinksfunction = async (postdata) => {
  try {
    let resp = await axios({
      'method': 'get',
      'url'  :`${config.vUrl}/token/social/sociallinksfunction`,
     
     
    });
   console.log("social returned data",resp.data.soci)
    return {
      data: resp.data.soci
    }
  }
  catch (err) {
  }

}

export const faqlists = async (postdata) => {
  try {
    let resp = await axios({
      'method': 'get',
      'url'  :`${config.vUrl}/token/social/faqlists`,
     
     
    });
   
    return {
      data: resp.data
    }
  }
  catch (err) {
  }

}


export const getPrivacyVal = async (postdata) => {
  try {
    let resp = await axios({
      'method': 'post',
      'url'  :`${config.vUrl}/admin/panel/getPrivacyVal`,
      data:postdata   
    });
   
    return {
      data: resp.data
    }
  }
  catch (err) {
  }

}


export const notifications = async (postdata) => {
  try {
    let resp = await axios({
      'method': 'post',
      'url'  :`${config.vUrl}/token/notifications`,
      data:postdata   
    });
   
    return {
      data: resp.data
    }
  }
  catch (err) {
  }

}

export const notificationStatusChange = async (postdata) => {
  try {
    let resp = await axios({
      'method': 'post',
      'url'  :`${config.vUrl}/token/notificationStatusChange`,
      data:postdata   
    });
   
    return {
      data: resp.data.data
    }
  }
  catch (err) {
  }

}

export const TokenImageCalls = async (postdata) => {
  try {
    let resp = await axios({
      'method': 'post',
      'url'  :`${config.vUrl}/token/TokenImageCalls`,
      data:postdata   
    });
   
    return {
      data: resp.data.data
    }
  }
  catch (err) {
  }

}



export const timeAuctionFunction = async (postdata) => {
  try {
    let resp = await axios({
      'method': 'post',
      'url'  :`${config.vUrl}/token/timeAuctionFunction`,
      data:postdata   
    });
   
    return {
      data: resp.data.data
    }
  }
  catch (err) {
  }

}


export const ActivityCall = async (postdata) => {
  //("activity axios data ",postdata);
  try {
    let resp = await axios({
      'method': 'get',
      'url'  :`${config.vUrl}/token/ActivityCall`,
      params:postdata   
    });
    //("soci11",resp.data)
    return {
      data: resp.data
    }
  }
  catch (err) {
  }

}


export const getcmslistinhome = async (postdata) => {
  try {
    let resp = await axios({
      'method': 'post',
      'url'  :`${config.Back_URL}/v1/token/use/getcmslistinhome`,
      data:postdata   
    });
    ////console..log("soci1",resp.data)
    return {
      data: resp.data.data
    }
  }
  catch (err) {
  }

}

export const getpromotion = async (filterData, dispatch) => {
  ////console.lo('yes')
  try {
      let respData = await axios({
          'method': 'get',
          'url': `${config.vUrl}/admin/panel/getpromotion`,
          params: filterData
      });
      return {
          loading: false,
          userValue: respData.data.userValue

      }
      ////console.lo("ok")
  }

  catch (err) {

      return {
          loading: false,
          // error: err.response.data
      }
      ////console.lo("not ok")
  }
}