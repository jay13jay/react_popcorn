import PropTypes from 'prop-types';
function ToggleButton({ isOpen, setIsOpen }) {
    return (
        <button
            className="btn-toggle"
            onClick={() => setIsOpen((open) => !open)} >
            {isOpen ? "–" : "+"}
        </button>
    )
}

ToggleButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};


export default ToggleButton;