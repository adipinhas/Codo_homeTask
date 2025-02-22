import React,{useState,useEffect} from 'react'
import { calculateNextNodePos,calculatePosition,calculateNodeSize } from './utils'
import Node from './Node'
import { useUser } from '../Context'
import Rect from './Rect'

const HomePage = () => {
    const {userData,userInfo, setUserInfo, lastOpendUnit,setLastOpendUnit,error} = useUser()
  
    
    const [calculatedNodesPos, setCalculatedNodesPos] = useState([]);
    const [text, setText] = useState(["",""]);
    const [nodeSize, setNodeSize] = useState(30);
    const [readytoRender, setReadytoRender] = useState(false); 

    const [firstPosition, setfirstPosition] = useState({ x: 0, y: 0 });
  
  
    

    useEffect(() => {
      let timer;
      const handleResize = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          let pos = calculatePosition()
          let nodeSize = calculateNodeSize()
          setfirstPosition(pos)
          setNodeSize(nodeSize)
        }, 300);
      };
      let nodeSize = calculateNodeSize()
      let pos = calculatePosition()
      setNodeSize(nodeSize)
      setfirstPosition(pos)
      
      window.addEventListener('resize', handleResize)
      
      return () => {
        window.removeEventListener('resize', handleResize)
        clearTimeout(timer) 
      };
    }, [userData]);  

    useEffect(() => {
      const textHomePage1  =[ "   זמן מעולה לכתוב קצת קוד "  , "שמח שחזרת" , "המסע שלנו בפייתון ממשיך" ][Math.floor(Math.random() * 3)]
      const textHomePage2 = ["?מה לומדים היום", "?מה נתרגל היום", "?במה בא לך להשתפר"][Math.floor(Math.random() * 3)];
      setText([textHomePage1,textHomePage2])
      console.log(lastOpendUnit);
      

  }, [userData]); 


  useEffect(() => {
    if (userData) {
      const unitIdList = userData.units.map((unit) => unit.id)
      const positions = [firstPosition];  

      for (let i = 1; i < unitIdList.length; i++) {
        const nextPos = calculateNextNodePos(unitIdList[i], positions[i - 1]);
        positions.push(nextPos);
      }

      setCalculatedNodesPos(positions)
      setReadytoRender(true)
    }

  }, [firstPosition]); 

    
 
  return ( readytoRender && (
    <div className='homepage'>
     <h1 className='homepage-text'>
  היי <span style={{ fontWeight: 'bold', color: '#ff6347' }}>{userInfo.name.split(" ")[0]}</span>,  {text[0]}  <br />
    {text[1]}
    <br />
    
    
</h1>
<div onClick={() => setUserInfo(null)} className='change-user-button'>החלף משתמש</div>



{userData ? calculatedNodesPos.map((node, i) => (
  
  <><Node key={i*10 +5} index ={i} x={node.x} y={node.y} size={nodeSize} data = {userData.units[i]} isOpen = {i === lastOpendUnit}  />

    {i < calculatedNodesPos.length -1 && <Rect  key = {(i+1)*100} x1={node.x} y1= {node.y} x2={calculatedNodesPos[i+1].x} y2 = {calculatedNodesPos[i+1].y} height={nodeSize}></Rect>}
  </>

)) :
error ? <h1>{error}</h1> : <></>



}



       
        
    </div>
  )
) 
}

export default HomePage