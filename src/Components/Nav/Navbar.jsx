import PropTypes from 'prop-types';
function Navbar({ children }) {
    return (
        <nav className="nav-bar">
            {children}
        </nav>
    );
}

Navbar.propTypes = {
  children: PropTypes.node.isRequired,
};




export default Navbar;