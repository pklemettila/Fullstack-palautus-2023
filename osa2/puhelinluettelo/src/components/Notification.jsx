const Notification = ({ message, isError }) => {
    if (message === null) {
        return null
    }
    if (isError === false) { return (
        <div className="notification notificationSuccess">
            {message}
        </div>
    ) } else if (isError === true) return (
        <div className="notification notificationError">
            {message}
        </div>
    )
}
export default Notification