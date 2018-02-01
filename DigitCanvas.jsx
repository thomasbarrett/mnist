// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const buttonStyle = {
  margin: '10px',
  marginBottom: '50px'
}

const canvasStyle = {
  margin: 'auto',
  marginTop: '50px',
  marginBottom: '10px',
  width: '280px',
  height: '280px'
}


class DigitCanvas extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const canvas = this.refs.canvas

    const ctx = canvas.getContext("2d")
    ctx.lineWidth = 1
    ctx.strokeStyle = 'black'
    ctx.imageSmoothingEnabled = false

    var mouse = {x:0, y:0}

    var onPaint = () => {
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    }

    canvas.addEventListener('mousemove', (event) => {
      mouse.x = (event.pageX - canvas.offsetLeft)/10;
      mouse.y = (event.pageY - canvas.offsetTop)/10;
    });

    canvas.addEventListener('mousedown', () => {
      ctx.beginPath();
      ctx.moveTo(mouse.x, mouse.y);
      canvas.addEventListener('mousemove', onPaint);
    });

    canvas.addEventListener('mouseup', () => {
      canvas.removeEventListener('mousemove', onPaint);
    });

    canvas.addEventListener('mouseleave', () => {
      canvas.removeEventListener('mousemove', onPaint);
    });
  }

  handleSubmit() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    var img = ctx.getImageData(0, 0, 28, 28);
    var data = []
    for (var i=3; i<3136; i+=4) {
      data.push(img.data[i]/255.0);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.props.runModel(data);
  }

  render() {
    return (
      <div style={{textAlign:'center'}}>
        <Paper style={{background:'rgb(238,238,238)', overflow:'auto'}} zDepth={1}>
          <Paper style={canvasStyle} zDepth={1}>
          <canvas style={{width:'280px', height:'280px'}} ref="canvas" width={28} height={28}></canvas>
          </Paper>
          <RaisedButton label="Submit" primary={true} onClick={this.handleSubmit} style={buttonStyle}/>
        </Paper>
      </div>
    )
  }
}

export default DigitCanvas
