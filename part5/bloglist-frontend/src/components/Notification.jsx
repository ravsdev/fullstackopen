const Notification = ({ message}) => {
    if(message === null ) return null
    return <div className='notification'>
      <span className={message.style ?? ''}>{message.text}</span>
    </div>  
  }
  
  export default Notification