import { queryLocation, queryWay } from 'api/getLocation'
import { gaodeOption } from '../config/gaodeSDK';

// 解决并发请求坐标顺序问题
export async function getLocation(param,storage){
    console.log(param)
    sessionStorage.setItem(storage, "")
   return Promise.all([...param].map((v,k)=>{
        return new Promise(
            (resolve)=>{
                    queryLocation({address:v.address,key: gaodeOption.key, city: gaodeOption.city}).then((cres)=>{
                        let obj = {
                            location:cres.data.info=="OK" && cres.data.geocodes[0].location,
                            name:v.name && v.name,
                            address:v.address && v.address,
                            }
                            return resolve(obj)
                    })
            }
        )
    })).then(res=>{
        sessionStorage.setItem(storage, JSON.stringify(res))
    })
}



