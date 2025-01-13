import PropTypes from 'prop-types'

const AuthForm = ({ handleSubmit, handleChange, values }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          type="text"
          value={values.username}
          name="Username"
          onChange={handleChange}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={values.password}
          name="Password"
          onChange={handleChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

AuthForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
}

export default AuthForm
