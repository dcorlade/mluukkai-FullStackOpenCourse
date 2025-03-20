import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  const severity = notification.type === 'success' ? 'success' : 'error'

  return notification.message !== '' && <Alert severity={severity}>{notification.message}</Alert>
}

export default Notification
