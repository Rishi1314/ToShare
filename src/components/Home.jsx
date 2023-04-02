import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"
import axios from 'axios'

const Home = () => {

  useEffect(() => {
    // fetch("https://ipfscacher.vercel.app/get")
    //       .then(res=>(console.log(res)))
    
  }, [])
  
  // async function caching(){
  //   const output=await axios.get("https://ipfscacher.vercel.app/get");
  //   // const output=await axios.get("http://localhost:3001/get");
  //   console.log(output);
  // }

  // caching();
  return (
    <div className='homePage'>
      <div className='homeText'>
        <motion.h1 
        initial={{ y:-300 }}
        animate={{ y:0}}
        transition={{ duration: 1}}
        ><span className='two'>2</span>Share</motion.h1>
        <motion.h3 
        initial={{ opacity:0 }}
        animate={{ opacity:1}}
        transition={{ duration: 1,delay:1}} >Share Files using words</motion.h3>
      </div>
        <div className='homeButtons'>
        
            <Link to="/upload">
              <motion.button initial={{opacity:0,scale:0.8}}
              animate={{opacity:1,scale:1}}
              transition={{ duration: 1.5}}>
              Upload</motion.button>
            </Link>
            
            <Link to="/retrieve"><motion.button initial={{opacity:0,scale:0.8}}
              animate={{opacity:1,scale:1}}
              transition={{ duration: 1.5}}>Retrieve</motion.button></Link>
            
        
        </div>
    </div>
  )
}

export default Home