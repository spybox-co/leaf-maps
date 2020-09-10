import React from 'react';

export function cn (...args) {
  return args.filter(Boolean).join(' ')
}

export function ucfirst (str) {
  return `${str.substr(0, 1).toUpperCase()}${str.substr(1)}`
}

export const TextFormatter = () => {
  function lastSingleLetterToNewLine(el) {
    let result;
    el.forEach(element => {
       
      if(!element.innerHTML.match(/[{}]|<script|^\n$/gi)){
        result = element.innerHTML.replace(/ (.) /gi, " "+'\$1'+"&nbsp;");
      }
      element.innerHTML = result;
      //console.log(result);
    });
  }
  let el = document.querySelectorAll('p, .paragraph, span, .Heading');
  //console.log(el)
  lastSingleLetterToNewLine(el);  
}




// Delay unMounting Component utility

//export const delayUnmounting = Delayed => {
export function delayUnmounting(Delayed) {
  return class extends React.Component {
    state = {
      shouldRender: this.props.isMounted
    };
    componentDidUpdate(prevProps) {
      if (prevProps.isMounted && !this.props.isMounted) {
        setTimeout(
          () => this.setState({ shouldRender: false }),
          this.props.delayTime
        );
      } else if (!prevProps.isMounted && this.props.isMounted) {
        this.setState({ shouldRender: true });
      }
    }
    render() {
      return this.state.shouldRender ? <Delayed {...this.props} /> : null;
    }
  };
}