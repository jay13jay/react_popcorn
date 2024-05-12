import PropTypes from 'prop-types';

function ErrorMessage({ message }) {
  return (
    <>
      <div className="error">
        <span>😰</span>
        <p>An error has occured</p>
      </div>
      <div className="error">
        Error: <p className="error-text"> {message} </p>
      </div>
    </>
  )
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
}

export default ErrorMessage;