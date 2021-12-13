import React from 'react'
import { useSelector } from 'react-redux'

import {
  Alert
} from '@material-ui/lab'

const Message = () => {
  const message = useSelector(state => state.message)

  if (message === null) {
    return null
  }

  return (
    <Alert severity='success'>
      {message}
    </Alert>
  )
}

export default Message