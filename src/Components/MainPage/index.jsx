import React, { useEffect, useState } from "react";
import ZoomImageViewer from "../Zoom-Image-Viewer";

const MainPage = () => {
  const [imgSrc, setImgSrc] = useState(null);
  const defaultZoom =  sessionStorage.getItem("defaultZoom")
  console.log("MainPage -> defaultZoom", defaultZoom)
   
  useEffect(() => {
    const img =
      sessionStorage.getItem("design") || "https://website-bin.s3.amazonaws.com/explorug/client/studiop/BEAT+MODA.png";
    setImgSrc(img);
    console.log("useEffect -> img", img);
   
  }, []);
  return <>{imgSrc !== "" ? <ZoomImageViewer imageSrc={imgSrc}  /> : <></>}</>;
};

MainPage.propTypes = {};

export default MainPage;
