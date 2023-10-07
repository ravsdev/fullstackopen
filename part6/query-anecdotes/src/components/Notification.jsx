import { useContext, useEffect } from "react"
import NotificationContext from "../NotificationContext"

const Notification = () => {

  const [notification, notificationDispatch] = useContext(NotificationContext)
  
  useEffect(()=>{
    if(notification!==null) setTimeout(()=>notificationDispatch({type: 'HIDE'}),5000)
  },[notification, notificationDispatch])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (notification===null) return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
