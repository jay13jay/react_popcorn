import PropTypes from 'prop-types';

function ListBox({ children }) {
    return (
        <div className="box">
            {children}
        </div>
    )
}

ListBox.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ListBox