import { Web3Storage} from 'web3.storage'


 
export const uploadToIpfs=(e)=>{
    console.log(e);
}

const client = new Web3Storage({ token: process.env.REACT_APP_IPFS_TOKEN });

export async function fileUpload(inpName,inputFile,password) {
    
   
    const cid = await client.put([inputFile], {
      name: inpName,
    })
    const fileName=inputFile.name;
    const filename = fileName

    const hashkey = cid
   
    return {cid,filename,hashkey,inpName,password};
  }
export const showLink=(ans)=>{
    
    return (ans);
  }


