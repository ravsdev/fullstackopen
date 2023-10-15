import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector((state) => state.notification)
    if (notification === null) return null

    return (
        <div className="notification">
            <span className={notification.style ?? ''}>
                {notification.text}
            </span>
        </div>
    )
}

export default Notification
