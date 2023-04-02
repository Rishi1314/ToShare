/* eslint-disable no-template-curly-in-string */
import { Button,FormLabel, useToast, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import {  getDatabase, onValue,  ref, set } from "firebase/database";
import { database } from './firedb';
import { motion } from "framer-motion"
import axios from 'axios';
import { Link } from 'react-router-dom';


const Retrieve = () => {
    const toast = useToast();
    const [link1, setlink1] = useState(null)

    const [active, setactive] = useState(true)
    const [file, setFile] = useState([])
    
    const twowordRef=useRef();
    const passwordRef=useRef();


    async function ipfscache(hashkey,filename,name,pass){
      
      const urls=["https://ipfs.io/ipfs/${hashkey}/${filename}",
                    "https://gateway.ipfs.io/ipfs/${hashkey}/${filename}",
                    "https://${hashkey}.ipfs.storry.tv/${filename}",
                    "https://${hashkey}.ipfs.cf-ipfs.com/${filename}",
                    "https://ipfs.fleek.co/ipfs/${hashkey}/${filename}",
                    "https://cloudflare-ipfs.com/ipfs/${hashkey}/${filename}",
                    "https://${hashkey}.ipfs.dweb.link/${filename}",
                    "https://ipfs.eth.aragon.network/ipfs/${hashkey}/${filename}",
                    "https://ipfs.filebase.io/ipfs/${hashkey}/${filename}",
                    "https://infura-ipfs.io/ipfs/${hashkey}"]
      for (const url of urls) {
          const link=(url.replace("${hashkey}",hashkey)).replace("${filename}",filename);
          const output=await axios.get(link).catch((err)=>{
            console.log(err);
          })
          if(output.status===200){
            
            const db2=getDatabase();
            console.log(hashkey);
            console.log(filename);
            console.log(name);
            set(ref(db2, 'files/' + name), {
                name: name,
                filename: filename,
                hashkey : hashkey,
                url:link,
                password:pass,
            })
            break
          }else{
            console.log("skip");
            continue
          }
          
                      
    }}
    function handleSubmit(){
      const genToast=(e)=>{
        toast({
          title: `NO FILE WITH WORD "${e}"`,
          status: "error",
          duration: 10000,
          isClosable: true,
          position: "bottom",
        })
      };
      const genToast2=(e)=>{
        toast({
          title: `Download available`,
          status: "info",
          duration: 10000,
          isClosable: true,
          position: "bottom",
        })
      }
      const genToast3=(e)=>{
        toast({
          title: `Wrong Password`,
          status: "error",
          duration: 10000,
          isClosable: true,
          position: "bottom",
        })
      }

      
        const temp =twowordRef.current.value;
        const pass=passwordRef.current.value;
        const fileData=file[0][temp];
        if(Object.keys(file[0]).includes(temp)){
          if(fileData.password===pass){
           ipfscache(fileData.hashkey,fileData.filename,fileData.name,fileData.password);
          setlink1(fileData.url);
          setactive(false);
          genToast2(); 
          }else{
            genToast3();
          }
          
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
         <input className='retrieveInputs' ref={twowordRef} type='text' />
          <button onClick={handleSubmit} className='searchButton'>Search</button>
          
         </div>
         
          {/* <FormHelperText style={{color:"white"}}>If you are unable to access the file, seek permission from Owner.</FormHelperText> */}
          <input className='retrieveInputs2' placeholder='Enter Password' ref={passwordRef} type='password' />
      <div className='retrieveButtons'>
        
      <Button isDisabled={active}>
      
      <a href={link1}>Click here to retrieve</a>
     
      </Button>
      
      </div>
     </VStack>
    </motion.div>
    <Link to="/cache">
              <motion.button className='retrievePageButton' 
              initial={{opacity:0,scale:0.8}}
              animate={{opacity:1,scale:1}}
              transition={{ duration: 1}}>
              Cache</motion.button>
            </Link>
    </div>
  )
}

export default Retrieve