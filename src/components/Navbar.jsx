import { useRef } from "react";
import { AiOutlineCloseCircle,AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"

const Navbar = () => {

    const navRef=useRef();
    function showNav(){
        navRef.current.classList.toggle("showNav");        
    }

  return (
    <>
    <motion.button initial={{opacity:0,scale:0.8}}
              animate={{opacity:1,scale:1}}
              transition={{ duration: 1.5}} className="navbarbutt" onClick={()=>showNav()}>
                <AiOutlineMenu className="hamburger"/>
              </motion.button>
    <div className='nav'>
        <div className="navbar" ref={navRef}>
            <div className="navbar1">
                <AiOutlineCloseCircle className="closeIcon" onClick={()=>showNav()}/>
            </div>
            <div className="navbar2">
                <Link to="/">
                <button>
                Home</button>
                </Link>
                <Link to="/upload">
                <button>
                Upload</button>
                </Link>
                <Link to="/cache">
                <button>
                Cache</button>
                </Link>
                
                <Link to="/retrieve"><button>Retrieve</button></Link>
            </div>
        </div>
    </div>
    </>
    
  )
}

export default Navbar