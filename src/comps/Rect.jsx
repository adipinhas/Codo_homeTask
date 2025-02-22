


import React from "react";

const Rect = ({ x1, y1, x2, y2, height }) => {
  const cx1 = x1;
  const cy1 =y1;
  const cx2= x2;
  const cy2 = y2;

  const width =Math.hypot(cx2 - cx1, cy2 - cy1);
  const angle = Math.atan2(cy2 - cy1, cx2 - cx1) * (180 / Math.PI);
  const midX = (cx1 + cx2) / 2;
  const midY = (cy1 + cy2) / 2;

  
  const extendedWidth = width + height; 

  return (
    <div
      style={{
        borderRadius: `${height/2}px`,
        position: "absolute",

        left: `${midX - extendedWidth / 2 + height/2}px`, 
        top: `${midY - height / 2 +height/2}px`, 
        width:`${extendedWidth}px`, 
        height:`${height}px`, 
        transform: `rotate(${angle}deg)`,
        transformOrigin: "center",
        background: `linear-gradient(179.95deg, rgba(255, 255, 255, 0.8) 12.97%, rgba(212, 208, 230, 0.8) 88.94%)`,

        boxShadow:`0px 4px 24px 0px rgba(0, 0, 0, 0.25)`

      }}
    />
  );
};

export default Rect;

