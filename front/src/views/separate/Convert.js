
import React, {useEffect,useState} from "react";
export default function Convert(props) {
        const[ val,set_val]=useState('')
        var {
        item,convertVal,coinName
        } = props;

        useEffect(()=>{
                var nev=item*convertVal
                nFormatter(nev,coinName)
                       });

function nFormatter(num, coinName) {
  var digits=5;
  var si = [
    { value: 1, symbol: "   " },
    { value: 1E3, symbol: " k " },
    { value: 1E6, symbol: " M " },
    { value: 1E9, symbol: " B " },
    { value: 1E12, symbol: " T " },
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  var bl=(num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol
  set_val(bl)
  return bl;
}


    return (
       <>
       
                <> {item > 0
              ?  (val!=0?val:"")
              :  (item/convertVal)}</>
                
       


      </>     
    )
}
