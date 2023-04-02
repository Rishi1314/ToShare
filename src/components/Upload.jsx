/* eslint-disable no-template-curly-in-string */
import {Button, Center,  Highlight, useToast, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { fileUpload,showLink } from './helpers/ipfs'
import { motion } from "framer-motion"


import { getDatabase, onValue, ref, set } from "firebase/database";
import { database } from './firedb';
import axios from 'axios';



const Upload = () => {

  const [loading, setLoading] = useState(false)
  const [view, setView] = useState(true)
  const [uploaded, setUploaded] = useState(false)
  const [upload, setUpload] = useState("Upload")
  const [pass,setPass]=useState("")


  const [uploadState, setUploadState] = useState(
  <Highlight query={['Upload', 'File']}
      styles={{ mx:'2',px: '2', py: '1', rounded: 'full', bg: '#47B5FF',color:"white" }}>
        Upload your File
    </Highlight>)


  const [file,setFile]=useState([])

  const fileRef=useRef();
  const toast = useToast();
  const wordsRef=useRef();
  const passRef=useRef();
  const passButtRef=useRef();

  useEffect(()=>{
  
    onValue(ref(database),snapshot=>{
      const data=snapshot.val();
      setFile(Object.values(data).map((doc) => ({ ...doc })));
      
    

    })

  },[])
  

  

  const fileCollected=()=>{
    setUploadState(<Highlight query={['File']}
    styles={{ mx:'2',px: '2', py: '1', rounded: 'full', bg: 'teal.100' }}>
          File Uploaded
      </Highlight>)
  }

  function showPassword(){
    console.log(passRef.current.classList);
    passRef.current.classList.toggle("showPassword")
  }
  const addFile=async(eword,ename,ehash,epass)=>{
    async function ipfscache(hashkey,filename,name,pass){
      const genToast=(e)=>{
        toast({
          title: `File has been added as: "${e}"`,
          status: "success",
          duration: 10000,
          isClosable: true,
          position: "bottom",
        })
      }
      const urls=[ "https://cloudflare-ipfs.com/ipfs/${hashkey}/${filename}",
                    "https://${hashkey}.ipfs.dweb.link/${filename}",
                    "https://${hashkey}.ipfs.cf-ipfs.com/${filename}",
                    "https://ipfs.fleek.co/ipfs/${hashkey}/${filename}",
                   
                    "https://ipfs.eth.aragon.network/ipfs/${hashkey}/${filename}",
                    "https://ipfs.filebase.io/ipfs/${hashkey}/${filename}",
                    "https://infura-ipfs.io/ipfs/${hashkey}",
                    "https://ipfs.io/ipfs/${hashkey}/${filename}",
                    "https://gateway.ipfs.io/ipfs/${hashkey}/${filename}",
                    "https://${hashkey}.ipfs.storry.tv/${filename}",]
                urls.some(async function(url,index){
                  try {
                    console.log("In try loop");
                    const link=(url.replace("${hashkey}",hashkey)).replace("${filename}",filename);
                    const output=await axios.get(link).catch((err)=>{
                      console.log("Error");
                    });
                    console.log(output);
                    if(output.status===200){
                      const db2=getDatabase();
                      // console.log(hashkey);
                      // console.log(filename);
                      // console.log(name);
                      // console.log(pass);
                      set(ref(db2, 'files/' + name), {
                          name: name,
                          filename: filename,
                          hashkey : hashkey,
                          url:link,
                          password:pass,
                      })
                      genToast(name);
                      setUpload("Uploaded");
                      setUploaded(true)
                      setLoading(false)

                      return true
                    };
                  } catch (error) {
                    console.log("Error");
                  }
                })
    //   for (const url of urls) {
          // const link=(url.replace("${hashkey}",hashkey)).replace("${filename}",filename);
          // console.log("IN");
          // const output=await axios.get(link);
          // console.log(output);
    //       if(output.status===200){
            
            // const db2=getDatabase();
            // // console.log(hashkey);
            // // console.log(filename);
            // // console.log(name);
            // // console.log(pass);
            // set(ref(db2, 'files/' + name), {
            //     name: name,
            //     filename: filename,
            //     hashkey : hashkey,
            //     url:link,
            //     password:pass,
            // })
            // break
    //       }else{
    //         console.log("skip");
    //         continue
    //       }
          
                      
    // }
  }
    ipfscache(ehash,ename,eword,epass)    
  }
  const handleChange=async()=>{
    
    
    const setVars=async(e)=>{
      const x=await showLink(e);
      console.log(x);
      // genToast(x.inpName);
      // console.log(x.password,"*");
      addFile(x.inpName,x.filename,x.hashkey,x.password)
      
      setView(false)
      
    }
    // const fileUploaded=()=>{
      
      // setUpload("Uploaded");
      // setUploaded(true)
      // setLoading(false)
    // }
    
    try {
        
     
      
      
      setLoading(true);
      if((wordsRef.current.value.length>=1) && fileRef.current.files[0]){
        if(Object.keys(file[0]).includes(wordsRef.current.value)){
          setLoading(false)
          toast({
            title: `Word taken. Use a different word`,
            status: "error",
            duration: 1000,
            isClosable: true,
            position: "bottom",
          })
        }
        else{
          fileUpload(wordsRef.current.value,fileRef.current.files[0],passRef.current.value)
          .then(setVars)
          // .then(fileUploaded)
        }
      }else if(wordsRef.current.value.length<1){
        setLoading(false);
        toast({
          title: `Please provide a name to retrieve later.`,
          status: "error",
          duration: 1000,
          isClosable: true,
          position: "bottom",
        })
      }
      
      else{
        setLoading(false);
        toast({
          title: `Please enter all the fields`,
          status: "error",
          duration: 1000,
          isClosable: true,
          position: "bottom",
        })
      }
      
   
 
      
      return
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
    
  }

  

  return (
    <div className='uploadPage'>
     <motion.div 
     transition={{duration:1}}
     initial={{y:-500}}
     animate={{y:0}}
     className='uploadBox'>
     <VStack spacing="10px">
      {/* <FormLabel textAlign={"center"}>Word</FormLabel> */}
      <input ref={wordsRef} className="uploadInputs" style={{bg:"white"}} type='text' placeholder='Enter a Word' />
      <input ref={passRef} className="password" style={{bg:"white"}} type='password' placeholder='Enter Password' />
      {/* <FormHelperText>This word will be used to access your file later.</FormHelperText> */}
      <div className='uploadArea'>
        <input ref={fileRef} name="file" placeholder="Upload File" type="file" onChange={fileCollected} multiple/>
        <Center>{uploadState}</Center>
      </div>
      
      <div className="uploadButtons">
      <Button
        colorScheme="blue"
        width="50%"
        onClick={handleChange}
        isLoading={loading}
        loadingText='Uploading'
        isDisabled={uploaded}
        zIndex={"5"}
      >
        {upload}
      </Button>
      <Button colorScheme="blue" ref={passButtRef} onClick={showPassword}
        width="50%">Add Password</Button>
      </div>
    
     </VStack>
     </motion.div>
     
    </div>
   
  )
}

export default Upload