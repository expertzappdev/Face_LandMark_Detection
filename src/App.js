import logo from './logo.svg';
import './App.css';
import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/facemesh';
import Webcam from 'react-webcam';
import React, { useEffect, useRef } from 'react';
import { drawMesh } from './utilities';
function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // useEffect(() => {
    const runFacemesh = async () => {
      const net = await facemesh.load({
       inputResolution: { width: 600, height: 480 }, scale: 0.5
      });
      console.log('Facemesh model loaded');

       setInterval(() => {
        detect(net);
     }, 100);
    };


  // }, []);

  // const detect = async (net) => {
  //   if (webcamRef.current && webcamRef.current.video.readyState === 4) {
  //     const video = webcamRef.current.video;
  //     const predictions = await net.estimateFaces(video);

  //     if (predictions.length > 0) {
  //       console.log(predictions);
  //       drawCanvas(predictions);
  //     }
  //   }
  // };

  const detect = async (net) => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      const predictions = await net.estimateFaces(video);

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const face = await net.estimateFaces(video);
      // if (face.length > 0) {
      //   console.log(face);
      //   drawCanvas(face);
      // }
      const ctx = canvasRef.current.getContext('2d');
      drawMesh(face, ctx);
      // if (predictions.length > 0) {
      //   console.log(predictions);
      //   drawCanvas(predictions);
      // }
    }
  };
  runFacemesh();
  // const drawCanvas = (predictions) => {
  //   const ctx = canvasRef.current.getContext('2d');
  //   ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

  //   predictions.forEach(prediction => {
  //     const keypoints = prediction.scaledMesh;
  //     for (let i = 0; i < keypoints.length; i++) {
  //       const [x, y] = keypoints[i];
  //       ctx.beginPath();
  //       ctx.arc(x, y, 1, 0, 2 * Math.PI);
  //       ctx.fillStyle = 'red';
  //       ctx.fill();
  //     }
  //   });
  // };

  
return (
  <div className="App">
  
  
    <Webcam ref={webcamRef} style={{
      position: 'absolute', left: '0', top: '0', width: '600px', height: '480px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', zIndex: '9'

    }} />
    <canvas ref={canvasRef} style={{
      position: 'absolute', left: '0', top: '0', width: '600px', height: '480px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', zIndex: '9'

    }} />
  </div>
);
}

export default App;
