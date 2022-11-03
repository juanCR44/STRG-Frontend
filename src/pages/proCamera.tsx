import React, { useState, useRef, useEffect } from "react";
import { Camera } from "react-camera-pro";
import { createSearchParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { detect } from "../controller/getmodel";

import LoadingEffect from "../components/loading";

const Procamera = () => {
  const camera = useRef<any>(null);
  const [image, setImage] = useState<any>(null);
  const [numberOfCameras, setNumberOfCameras] = useState(1);
  const [loading, setLoading] = useState(false)

  const [res, setRes] = useState<any>()
  let navigate = useNavigate();

  const error = {
    noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
    permissionDenied: 'Permission denied. Please refresh and give camera permission.',
    switchCamera:
      'It is not possible to switch camera to different one because there is only one video device accessible.',
    canvas: 'Canvas is not supported.'
  }

  useEffect(() => {
    if (!localStorage.getItem('id')) {
      navigate('/')
    }
  }, [])

  async function takephoto(data: any) {

      const photo = data.current.takePhoto();
      setLoading(true)

      let res = await detect(photo)
      console.log(res)
      let imagesGood = res.resultGood.map((s: any) => `'${s}'`).join(',');
      let imagesBad = res.resultBad.map((s: any) => `'${s}'`).join(',');
      let count = res.count
      let average = res.average
      let namesGood = res.namesGood.map((s: any) => `'${s}'`).join(',');
      let namesBad = res.namesBad.map((s: any) => `'${s}'`).join(',');


      const params = { imagesGood: imagesGood, imagesBad: imagesBad,average: average, count: count, namesGood: namesGood, namesBad: namesBad }
      setTimeout(() => {
        setLoading(false)
        navigate({
          pathname: "/dashboard",
          search: `?${createSearchParams(params)}`
        });
      }, 1000);
    
  }

  function switchCam(data: any) {
    data.current.switchCamera();
  }

  return (
    <div className="camera-container">

      {
        (!loading && localStorage.getItem('id')) ?
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
            <LoadingEffect text={'Detectando productos'} pos = {true} fixed = {'no'}/>
          )
      }
    </div>
  );
}

export default Procamera;