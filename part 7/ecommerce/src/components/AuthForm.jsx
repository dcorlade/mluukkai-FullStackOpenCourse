import { Button, TextField } from '@mui/material'
import PropTypes from 'prop-types'

const AuthForm = ({ handleSubmit, handleChange, values }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: 7 }}>
        <TextField
          name="Username"
          label="username"
          size="small"
          value={values.username}
          onChange={handleChange}
        />
      </div>
      <div style={{ marginBottom: 7 }}>
        <TextField
          name="Password"
          label="password"
          size="small"
          value={values.password}
          onChange={handleChange}
          type="password"
        />
      </div>

      <div>
        <Button variant="contained" color="primary" type="submit">
          login
        </Button>
      </div>
    </form>
  )
}

AuthForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired
}

export default AuthForm
