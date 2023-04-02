/* eslint-disable no-template-curly-in-string */
import { Button,FormLabel, useToast, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import {  getDatabase, onValue,  ref, set } from "firebase/database";
import { database } from './firedb';
import { motion } from "framer-motion"
import axios from 'axios';
// import { db } from './firebase';
// import {collection,getDocs} from "firebase/firestore"

const Retrieve = () => {
    const toast = useToast();
    const [link1, setlink1] = useState("")
    const [cachestatus, setcachestatus] = useState(false)
    const [cache, setcache] = useState("Cache")
    const [active, setactive] = useState(true)
    const [file, setFile] = useState([])
    const [loading, setLoading] = useState(false)

    const twowordRef=useRef();
    // const fileCollectionRef=collection(db,"files")

    async function ipfscache(hashkey,filename,name){
      console.log("Trying to cache...");
        const genToast3=(e)=>{
            toast({
              title: `File can be shared using the word: "${name}"`,
              status: "success",
              duration: 10000,
              isClosable: true,
              position: "bottom",
            })
          }
      setLoading(true)
      const urls=["https://cloudflare-ipfs.com/ipfs/${hashkey}/${filename}",
                  "https://ipfs.io/ipfs/${hashkey}/${filename}",
                    "https://gateway.ipfs.io/ipfs/${hashkey}/${filename}",
                    "https://${hashkey}.ipfs.storry.tv/${filename}",
                    "https://${hashkey}.ipfs.cf-ipfs.com/${filename}",
                    "https://ipfs.fleek.co/ipfs/${hashkey}/${filename}",
                    
                    // "https://${hashkey}.ipfs.dweb.link/${filename}",
                    "https://ipfs.eth.aragon.network/ipfs/${hashkey}/${filename}",
                    "https://ipfs.filebase.io/ipfs/${hashkey}/${filename}",
                    "https://infura-ipfs.io/ipfs/${hashkey}"]
                    // urls.forEach(url => 
                    //   fetch(`${(url.replace("${hashkey}",hashkey)).replace("${filename}",filename)}`).then(res => res.json())
                    // )
            urls.forEach(async(url)=>{
              try {
                const link=(url.replace("${hashkey}",hashkey)).replace("${filename}",filename);
                const outsie=await axios.get(link).catch((err)=>{
                  console.log(err);
                })
                console.log(outsie.status);
                console.log(link);
              } catch (error) {
                console.log(error);
              }
            })
    //   for (const url of urls) {
    //       try {
    //         const link=(url.replace("${hashkey}",hashkey)).replace("${filename}",filename);
    //       const output=await axios.get(link).catch((err)=>{
    //         console.log(err);
    //       })
    //       if(output.status===200){
            
    //         const db2=getDatabase();
    //         console.log(hashkey);
    //         console.log(filename);
    //         console.log(name);
    //         set(ref(db2, 'files/' + name), {
    //             name: name,
    //             filename: filename,
    //             hashkey : hashkey,
    //             url:link,
    //         })
    //         setLoading(false)
    //         setcachestatus(true)
    //         setcache("Cached")
    //         genToast3();
    //         break
    //       }else{
    //         console.log("skip");
    //         continue
    //       }
    //       } catch (error) {
    //         console.log("ERROR: ",error);
    //       }
          
                      
    // }
  }
    function handleSubmit(){
      console.log("Handling Submit");
      const genToast=(e)=>{
        toast({
          title: `NO FILE WITH WORD"${e}"`,
          status: "error",
          duration: 10000,
          isClosable: true,
          position: "bottom",
        })
      };
      
      const genToast2=(e)=>{
        toast({
          title: `Caching Started.`,
          status: "info",
          duration: 10000,
          isClosable: true,
          position: "bottom",
        })
      }

      
        const temp =twowordRef.current.value;
        const fileData=file[0][temp];
        if(Object.keys(file[0]).includes(temp)){

          ipfscache(fileData.hashkey,fileData.filename,fileData.name);
          setlink1(fileData.url);
          setactive(false);
          genToast2();
        }else{
          console.log("WTF?");
          genToast(temp)
        }
    }
   

    useEffect(()=>{
      onValue(ref(database),snapshot=>{
        const data=snapshot.val();
        setFile(Object.values(data).map((doc) => ({ ...doc })));
  
      })
      
    },[])

    
    


  return (
    <div className='retrievePage'>
      <motion.div 
     transition={{duration:1}}
     initial={{y:-500}}
     animate={{y:0}} className='retrieveCard'>
        <VStack spacing="10px">
 
          <FormLabel style={{textAlign:"center",color:"white",fontSize:"150%"}}>Enter your 2Share Word</FormLabel>
         <div className='searchBox'>
         <input className='cacheInputs' ref={twowordRef} style={{bg:"white"}} type='text' />
          {/* <button onClick={handleSubmit} className='searchButton'>Search</button> */}
          <Button
        className='searchButton'
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
        isLoading={loading}
        loadingText='Caching'
        isDisabled={cachestatus}
        zIndex={"5"}
      >
        {cache}
      </Button>
         </div>
          {/* <FormHelperText style={{color:"white"}}>If you are unable to access the file, seek permission from Owner.</FormHelperText> */}
      
     </VStack>
    </motion.div>
    </div>
  )
}

export default Retrieve