'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _AppBar = require('material-ui/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const buttonStyle = {
  margin: '10px',
  marginBottom: '50px'
};

const canvasStyle = {
  margin: 'auto',
  marginTop: '50px',
  marginBottom: '10px',
  width: '280px',
  height: '280px'
};

class DigitCanvas extends _react2.default.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const canvas = this.refs.canvas;

    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.imageSmoothingEnabled = false;

    var mouse = { x: 0, y: 0 };

    var onPaint = () => {
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    };

    canvas.addEventListener('mousemove', event => {
      mouse.x = (event.pageX - canvas.offsetLeft) / 10;
      mouse.y = (event.pageY - canvas.offsetTop) / 10;
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
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    var img = ctx.getImageData(0, 0, 28, 28);
    var data = [];
    for (var i = 3; i < 3136; i += 4) {
      data.push(img.data[i] / 255.0);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.props.runModel(data);
  }

  render() {
    return _react2.default.createElement(
      'div',
      { style: { textAlign: 'center' } },
      _react2.default.createElement(
        _Paper2.default,
        { style: { background: 'rgb(238,238,238)', overflow: 'auto' }, zDepth: 1 },
        _react2.default.createElement(
          _Paper2.default,
          { style: canvasStyle, zDepth: 1 },
          _react2.default.createElement('canvas', { style: { width: '280px', height: '280px' }, ref: 'canvas', width: 28, height: 28 })
        ),
        _react2.default.createElement(_RaisedButton2.default, { label: 'Submit', primary: true, onClick: this.handleSubmit, style: buttonStyle })
      )
    );
  }
}

exports.default = DigitCanvas;
