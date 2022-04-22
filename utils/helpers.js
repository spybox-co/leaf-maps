export function cn (...args) {
  return args.filter(Boolean).join(' ')
}

export function ucfirst (str) {
  return `${str.substr(0, 1).toUpperCase()}${str.substr(1)}`
}

// Hash Color from String

const hashCode = str => {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

const intToRGB = i => {
  let c = (i & 0x00ffffff).toString(16).toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
};

export const GetColor = name => {
  return '#' + intToRGB(hashCode(name));
};


// export const TextFormatter = () => {
//   function lastSingleLetterToNewLine(el) {
//     let result;
//     el.forEach(element => {
       
//       if(!element.innerHTML.match(/[{}]|<script|^\n$/gi)){
//         result = element.innerHTML.replace(/ (.) /gi, ` `+`\$1`+`&nbsp;`);
//       }
//       element.innerHTML = result;
//       //console.log(result);
//     });
//   }
//   let el = document.querySelectorAll('p, .paragraph, span, .Heading');
//   //console.log(el)
//   lastSingleLetterToNewLine(el);  
// }


// User default position helper
export const locationAPI = {
  GEOLOCDB: `https://www.geolocation-db.com/json/`
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