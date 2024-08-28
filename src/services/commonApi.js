import axios from "axios"

const commonApi=async(reqMethod,reqUrl,reqBody,reqHeaders)=>{
    const axiosConfig={
        method:reqMethod,
        url:reqUrl,
        data:reqBody,
        headers:reqHeaders?reqHeaders:{'Content-Type':'application/json'}
    }

    return await axios(axiosConfig).then(res=>{return res}).catch(err=>{return err})
}

export default commonApi