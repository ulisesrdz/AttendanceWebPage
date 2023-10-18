import React, {Component,useState} from "react";
import {BrowserMultiFormatReader,NotFoundException,ChecksumException,FormatException} from "@zxing/library";

const Message= (props) => {
  const messageState = useState( props.data );
  const listState = useState( [] );
}


class BarcodeRender extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      SelectedDeviceId: '',      
      data:'Scan Code',
      videoInputDevices:[],
    };
  }
  
  handleCallBack = (dataInput) => {
    console.log("Found QR code6!");
    this.state.setState({ data: dataInput})
   }

   


  render (){

    const {dataInput} = this.state;
  // this.state = {
  //   setSelectedDeviceId : ""
  // };
  //const [selectedDeviceId, setSelectedDeviceId] = useState("");
  //const [codes, setCode] = useState("");
  //const [videoInputDevices, setVideoInputDevices] = useState([]);
  const codeReader = new BrowserMultiFormatReader();
  const brRead ="";

  

  function scanClick() {
    codeReader.getVideoInputDevices().then(videoInputDevices => {
            //setupDevices(videoInputDevices);
            if (videoInputDevices.length >= 2) {
              decodeContinuously(videoInputDevices[1].deviceId);
            }
            else{
              decodeContinuously(videoInputDevices[0].deviceId);
            }
            
          }).catch(err => {
            console.error(err);
          });
    //decodeContinuously(this.selectedDeviceId);
  }



  function decodeContinuously(selectedDeviceId) {
    codeReader.decodeFromInputVideoDeviceContinuously(
      selectedDeviceId,
      "video",
      (result, err) => {
        if (result) {
          // properly decoded qr code
          
          console.log("Found QR code!", result.text);
          
          //this.setState({ setCode : result.text});
          document.getElementById('result').textContent = result.text
          console.log("Found QR code2!", brRead);
          alert("Asistencia registrada ",result.text);
          codeReader.reset();
          codeReader.stopContinuousDecode();
          codeReader=new BrowserMultiFormatReader();
         
        }

        if (err) {
          //this.setCode("");
          
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

    return (
      <div className="Contenido">
         {/* <div id="sourceSelectPanel">
          <label for="sourceSelect">Change video source:</label>
          <select
            id="sourceSelect"
            onChange={() => this.state.setSelectedDeviceId(this.props.sourceSelect.value)}
          > 
            { 
              this.state.videoInputDevices.map(element => (
                <option value={element.deviceId}>{element.label}</option>
              )) 
            }
          </select>
        </div> */}
        <div>
          <pre>
            <code id="result">REsultado </code>
          </pre>
          <input type="text" id="txtScan" name="txtScan" value={this.messageState} />
          <button id="scanButton" onClick={() => scanClick()}>
            Scan
          </button>
          <div>
            <video id="video" width="300" height="200" />
          </div>
        </div>
      </div>
    );
  }
}

export default BarcodeRender;
