import numeral from "numeral";


export const numberFormat =(n)=>{
    return numeral(n).format('0,0')
}