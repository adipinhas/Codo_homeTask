import React, { useEffect } from "react";
import { useUser } from "../Context";

const Node = ({ index, x, y, size, data, isOpen }) => {
    const {setLastOpendUnit} = useUser()
    useEffect(()=>{
        // console.log(isOpen);
        
    },[])

  const newSize = isOpen ? size * 1.5 : size; 
  const offset = (newSize - size) / 2; 

  
  const openStyle = {
    width: `${newSize}px`,
    height: `${newSize}px`,
    background: "linear-gradient(58.67deg, #FFAC06 16.63%, #FFD54E 92%)",
    boxShadow: `0px 4px 20px 0px rgba(255, 191, 40, 1)`

  };

  
  const closedStyle = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor:  (data && data.isOpen) ? "rgba(31, 24, 62, 0.4)" : 'rgba(31, 24, 62, 1)',

  };

  
  const baseStyle = {
    zIndex: 1,
    position: "absolute",
    left: `${x - offset}px`, 
    top: `${y - offset}px`, 
    borderRadius: "50%",
    cursor: "pointer",
    
  }

  const titleStyle = {
   top:`${y - offset - 50}px`,
   borderRadius: "4px",
   backgroundColor: isOpen ? 'rgba(230,230,230,1)' :'rgba(230,230,230,0.8)' ,
   padding:"4px",
   fontSize: isOpen ? (20*size)/78 : (18*size)/65 ,


   fontWeight : isOpen ? 700 : 400

   

}

  return<>
   <div onClick={() => setLastOpendUnit(index)} style={{ ...baseStyle, ...(isOpen ? openStyle : closedStyle) }}></div>
   <div style={{ ...baseStyle,...titleStyle }}>{data && data.name}</div>

    
   </>;
};

export default Node;
