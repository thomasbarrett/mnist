import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import DigitCanvas from './DigitCanvas.js'
import KerasJS from 'keras-js';

class Application extends React.Component {

  constructor(props) {
    super(props);
    this.runModel = this.runModel.bind(this);
    this.state = {
      digit: undefined,
    }
  }

  runModel(data) {
    const model = new KerasJS.Model({
      filepath: './mnist.bin',
      filesystem: true
    })
    model.ready().then(() => {
      const inputData = {
        input: new Float32Array(data)
      }
      return model.predict(inputData)
    }).then(outputData => {
      var max = 0;
      var dig = 0;

      for (var i=0; i<10; i++) {
        let data = outputData.output[i]
        if (data > max) {
          max = data
          dig = i
        }
      }
      this.setState({
        digit:dig
      });
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="MNIST" showMenuIconButton={false}/>
          <DigitCanvas runModel={this.runModel}></DigitCanvas>
          <h1 style={{fontFamily:'Roboto', fontWeight:'normal'}}>Output: {this.state.digit}</h1>
        </div>
      </MuiThemeProvider>
    )
  }
}


ReactDOM.render(
  <Application />,
  document.getElementById('root')
);
