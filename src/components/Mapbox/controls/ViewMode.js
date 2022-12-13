const styles = {
  position: 'absolute',
  top: 196,
  left: 8,
  padding: 8,
  zIndex: 1000,
  height: 32,
  display: 'flex',
  alignItems: 'center'
};

export default function ViewMode({ onClick, mode }) {
  
  const setLabel = () => {
    if(mode === '2D') {
      return '3D'
    }
    if(mode === '3D') {
      return '2D'
    }
  }

  const label = setLabel();
  
  return(
    <button style={styles} onClick={onClick}>
      {label}
    </button>
  )
}