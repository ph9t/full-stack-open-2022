import PropTypes from 'prop-types'

import { TbCircleCheckFilled, TbExclamationCircle } from 'react-icons/tb'

const Notification = ({ notification }) => {
  const { message, type } = notification

  const label = {
    success: <TbCircleCheckFilled />,
    error: <TbExclamationCircle />,
  }

  if (message === null) return null

  return (
    <div className='notif-container'>
      <div className={`notif ${type}`}>
        {label[type]} {message}
      </div>
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.object.isRequired,
}

export default Notification
