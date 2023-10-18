import React, {useState, useEffect} from "react";
//import BarcodeReader from '../Components/BarcodeReader';
import {BrowserMultiFormatReader,NotFoundException,ChecksumException,FormatException} from "@zxing/library";
import Students from "./Students";
import '../../../client/src/App.css';
import { useNavigate  } from 'react-router-dom'; 

function StudentsRegister(){

    
    const [selectedDeviceId, setSelectedDeviceId] = useState("");
    const [code, setCode] = useState("");
    const [videoInputDevices, setVideoInputDevices] = useState([]);
    let codeReader = new BrowserMultiFormatReader();
    const sourceSelect = document.getElementById("sourceSelect");
    const navigate = useNavigate ();
    
    const titles = [
      'Nombre',
      'Apellido',
      'Hora Registro',
      // Add more titles as needed
    ];
    const [items, setItems]= useState([
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
      { id: 4, name: 'Item 4' },
      { id: 5, name: 'Item 5' },
      { id: 6, name: 'Item 6' },
    ]);

    const addItem = () => {
      const newItem = { id: Date.now(), name: `Item ${items.length + 1}` };
      setItems([...items, newItem]);
    };

    useEffect(() => {
        codeReader
          .listVideoInputDevices()
          .then(videoInputDevices => {
            setupDevices(videoInputDevices);
          })
          .catch(err => {
            console.error(err);
          });
      }, []);

      function scanClick(){
        
        decodeContinuously(selectedDeviceId);
              
      }

      function setupDevices(videoInputDevices) {
        
    
        // selects first device
        setSelectedDeviceId(videoInputDevices[0].deviceId);
    
        // setup devices dropdown
        if (videoInputDevices.length >= 1) {
          setVideoInputDevices(videoInputDevices)
        }
      }
      function resetClick() {
        codeReader.reset();
        codeReader.stopContinuousDecode();
        codeReader = new BrowserMultiFormatReader();
        PathToLink();
        console.log("Stop");
      }

      function decodeContinuously(selectedDevicesId) {
        codeReader.decodeFromVideoDevice(
            selectedDevicesId,
          "video",
          (result, err) => {
            if (result) {
              // properly decoded qr code
              console.log("Found QR code!", result);
              setCode(result.text);         
            }
    
            if (err) {             
              if (err instanceof NotFoundException) {
                console.log("No QR code found.");
              }    
              if (err instanceof ChecksumException) {
                console.log("A code was found, but it's read value was not valid.");
              }    
              if (err instanceof FormatException) {
                console.log("A code was found, but it was in a invalid format.");
              }
            }
          }
        );
      }

      function PathToLink() {        
        navigate('/MainPage');
       }

   
    return(
        <>
            <div className="StudentsRegister">
                <h1>Asistencia</h1>
            </div>
            <div className="BarcodeReaderContainer">
                <label>QrCode</label>
                <button id="scanButton" onClick={() => scanClick()}>
                    Scan
                </button>
               
            </div>
            <main className="wrapper">
                <section className="container" id="demo-content">
                  <div id="sourceSelectPanel">
                    <label htmlFor="sourceSelect">Change video source:</label>
                    <select
                      id="sourceSelect"
                      onChange={() => setSelectedDeviceId(sourceSelect.value)}
                    > 
                      {                        
                        videoInputDevices.map(element => (
                          <option key={element.deviceId} value={element.deviceId}>{element.label}</option>
                        )) 
                      }
                </select>
                </div>

                <div>
                  <video id="video" width="300" height="200" />
                </div>

                <label>Result:</label>
                <pre>
                  <code id="result">{code}</code>
                </pre>

                <button id="resetButton" onClick={() => resetClick()}>
                  Reset
                </button>
                <button onClick={addItem}>Add Item</button>
              </section>
              <div className="title-grid-view">
                {titles.map((title, index) => (
                  <div key={index} className="title-item">
                    {title}
                  </div>
                ))}
              </div>        
              <div className="grid-container">
              {
                items.map(item => (
                  <div key={item.id} className="grid-item">
                    {item.name}
                  </div>
                ))}
            </div>
            </main>
        </>
        
    );
}

export default StudentsRegister;