import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    borderColor: notification.type === 'success' ? 'green' : 'red',
    color: notification.type === 'success' ? 'green' : 'red'
  }
  return notification.message !== '' && <div style={style}>{notification.message}</div>
}

export default Notification
