import React, { Component } from "react";
import Scrollbars from "react-custom-scrollbars";

export default class CustomScrollbars extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      top: 0,
      verHeight: `100%`
    };
    this.handleScrollFrame = this.handleScrollFrame.bind(this);
    this.renderView = this.renderView.bind(this);
    this.renderTrackVertical = this.renderTrackVertical.bind(this);
  }

  handleScrollFrame(values) {
    const { top } = values;
    this.setState({ top });
  }

  renderView({ style, ...props }) {
    const { top } = this.state;
    const color = top * 255;
    const customStyle = {
      backgroundColor: `rgb(${color}, ${color}, ${color})`
    };
    return <div {...props} style={{ ...style, ...customStyle }} />;
  }

  renderTrackVertical({ style, ...props }) {
    const { verHeight } = this.state;
    const customStyle = {
      width: `0.5rem`,
      right: 0,
      height: verHeight
    };
    return (
      <div
        {...props}
        className="track-vertical"
        style={{ ...style, ...customStyle }}
      />
    );
  }
  renderThumbVertical({ style, ...props }) {
    const customStyle = {
      backgroundColor: `#666`,
      opacity: 0.5
    };
    return (
      <div
        {...props}
        className="thumb-vertical"
        style={{ ...style, ...customStyle }}
      />
    );
  }
  render() {
    const { style, area, ...other } = this.props;
    return (
      <Scrollbars
        style={{ ...style, ...area }}
        renderTrackVertical={this.renderTrackVertical}
        renderThumbVertical={this.renderThumbVertical}
        // renderTrackHorizontal={props => (
        //   <div {...props} className="track-horizontal" />
        // )}
        // renderThumbHorizontal={props => (
        //   <div {...props} className="thumb-horizontal" />
        // )}
        //renderView={this.renderView}
        //onScrollFrame={this.handleScrollFrame}
        {...other}
      >
        {this.props.children}
      </Scrollbars>
    );
  }
}
