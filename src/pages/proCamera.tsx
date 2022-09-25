import React, { useState, useRef } from "react";
import { Camera } from "react-camera-pro";
import { createSearchParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { testing } from "../controller/getmodel";

const Procamera = () => {
  const camera = useRef<any>(null);
  const [image, setImage] = useState<any>(null);
  const [numberOfCameras, setNumberOfCameras] = useState(1);
  const [loading, setLoading] = useState(false)

  const [ res, setRes] = useState<any>()
  let navigate = useNavigate();

  const error = {
    noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
    permissionDenied: 'Permission denied. Please refresh and give camera permission.',
    switchCamera:
      'It is not possible to switch camera to different one because there is only one video device accessible.',
    canvas: 'Canvas is not supported.'
  }


  async function takephoto(data: any) {
    const photo = data.current.takePhoto();
    setLoading(true)
    
    let res = await testing(photo)
    console.log(res)
    res = res.map((s:any) => `'${s}'`).join(',');
    //console.log(res)
    //res = res.replace(/'/g, '"')
    //res = JSON.parse(res)
    //console.log(typeof(res))
    //console.log("ha salido!!!")
//
    //console.log(res)

    const params = {image:res}
    setTimeout(() => {
        setLoading(false)
        navigate({
          pathname:"/dashboard",
          search:`?${createSearchParams(params)}`
        }); 
    }, 1000);
  }

  function switchCam(data: any) {
    data.current.switchCamera();
  }

  return (
    <div className="camera-container">

      {
        !loading ?
          (
            <>
              <Camera ref={camera} numberOfCamerasCallback={setNumberOfCameras} errorMessages={error} />
              {/*<button onClick={() => takephoto(camera)}>Take photo</button>*/}
              <div className="take-picture" onClick={() => takephoto(camera)} >
                <span className="camera-button-out"></span>
                <span className="camera-button-in"></span>
              </div>
              <Link to={'/dashboard'} ><i className="uil uil-angle-right-b"></i></Link>
              <i className="uil uil-bolt"></i>
              <i onClick={() => switchCam(camera)} className="uil uil-camera-change"></i>
            </>
          ) : (
            <>
              CARGANDO!!.....
            </>
          )
      }
    </div>
  );
}

export default Procamera;