import PropTypes from 'prop-types'


export const Card = ({ children }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-2 w-auto sm:p-4 sm:w-50 md:w-64 lg:w-72">
        {children}
    </div>
    )
}

Card.propTypes = {
    children: PropTypes.node.isRequired
}