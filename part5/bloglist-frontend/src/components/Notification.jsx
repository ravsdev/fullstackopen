const Notification = ({ message }) => {
    if(message === null ) return null
    return <>
      {message}
    </>  
  }
  
  export default Notification