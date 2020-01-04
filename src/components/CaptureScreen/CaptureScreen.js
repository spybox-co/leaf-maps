import React, { Component } from "react";
import html2canvas from "html2canvas";
import domtoimage from 'dom-to-image';

const capture = document.querySelector('header');

export default class CaptureSreen extends Component {
  state = {
    image: null
  }
  componentDidMount() {

  }
  makeScreenShot = screenshot => {
    html2canvas(screenshot).then(canvas => {
      capture.appendChild(canvas);
      const imgData = canvas.toDataURL('image/png');
      this.setState({
        image: imgData
      })
    });
  }
  makeImageOfElement = node => {
    domtoimage.toPng(node)
    .then(dataUrl => {
        var img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
    })
    .catch(error => {
        console.error('oops, something went wrong!', error);
    });
  }

  render() {
    const { image } = this.state;
    return (
      <div>
        <button onClick={event => this.makeImageOfElement(capture)}>Print Screen</button>
        {image !== null ? (
          <div style={{ position: `absolute` }}>
            <img src={image} />
          </div>
        ) : null} 
      </div>
    );
  }
}