'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _AppBar = require('material-ui/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _DigitCanvas = require('./DigitCanvas.js');

var _DigitCanvas2 = _interopRequireDefault(_DigitCanvas);

var _kerasJs = require('keras-js');

var _kerasJs2 = _interopRequireDefault(_kerasJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Application extends _react2.default.Component {

  constructor(props) {
    super(props);
    this.runModel = this.runModel.bind(this);
    this.state = {
      digit: undefined
    };
  }

  runModel(data) {
    const model = new _kerasJs2.default.Model({
      filepath: './mnist.bin',
      filesystem: true
    });
    model.ready().then(() => {
      const inputData = {
        input: new Float32Array(data)
      };
      return model.predict(inputData);
    }).then(outputData => {
      var max = 0;
      var dig = 0;

      for (var i = 0; i < 10; i++) {
        let data = outputData.output[i];
        if (data > max) {
          max = data;
          dig = i;
        }
      }
      this.setState({
        digit: dig
      });
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return _react2.default.createElement(
      _MuiThemeProvider2.default,
      null,
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_AppBar2.default, { title: 'MNIST', showMenuIconButton: false }),
        _react2.default.createElement(_DigitCanvas2.default, { runModel: this.runModel }),
        _react2.default.createElement(
          'h1',
          { style: { fontFamily: 'Roboto', fontWeight: 'normal' } },
          'Output: ',
          this.state.digit
        )
      )
    );
  }
}

_reactDom2.default.render(_react2.default.createElement(Application, null), document.getElementById('root'));
