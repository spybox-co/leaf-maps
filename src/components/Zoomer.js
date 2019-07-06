import React, { Component } from 'react';
import { Button, TextInput } from 'carbon-components-react';
import IconButton from './IconButton';


const style = {
  root: {
    display: `flex`,
    flexWrap: `nowrap`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-end`
  },
  input: {
    width: 200
  },
  button: {
    minHeight: 40
  }

}

class Zoomer extends Component {
  constructor() {
    super()
    this.state = {
      invalid: false
    }
  }

  zoomIn = () => {
    this.props.setZoom(this.props.zoom + 1);
  }
  zoomOut = () => {
    this.props.setZoom(this.props.zoom - 1);
  }

  render() {
    return (
      <div style={style.root}>            
        <div style={style.input}>       
          <TextInput 
            style={style.input}
            id="zoom-number"
            labelText="Set zoom of the map (temporary)"
            // type="number"
            value={`${this.props.zoom}`}
            min={0}
            max={20}
            maxLength={2}
            light={true}
            invalidText="only number & max 20"
            invalid={this.state.invalid}
            onChange={this.props.onChange}
          />
        </div> 
        <IconButton 
          style={style.button} 
          kind="secondary" 
          disabled={this.props.zoom == 0 ? true : false}
          onClick={event => this.zoomOut()}
          renderIcon={minus}/>
        <IconButton 
          style={style.button} 
          kind="secondary" 
          disabled={this.props.zoom == this.props.maxZoom ? true : false}
          onClick={event => this.zoomIn()}
          renderIcon={add}
        />
      </div>
    );
  }
}

export default Zoomer;



const minus = () => {
  return (
    <svg x="0px" y="0px" style={{ fill: `#ffffff` }} width="12px" height="12px" viewBox="0 0 16 16">
      <rect x="4" y="7.5" width="8" height="1"/>
    </svg>
  )
}
const add = () => {
  return (
    <svg x="0px" y="0px" style={{ fill: `#ffffff` }} width="12px" height="12px" viewBox="0 0 16 16">
      <polygon points="8.5,7.5 8.5,3 7.5,3 7.5,7.5 3,7.5 3,8.5 7.5,8.5 7.5,13 8.5,13 8.5,8.5 13,8.5 13,7.5 "/>
    </svg>
  )
}