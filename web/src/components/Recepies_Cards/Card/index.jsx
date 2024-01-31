import PropTypes from 'prop-types'


export const Card = ({ children }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-2 w-auto sm:p-4 sm:w-fit md:w-80">
        {children}
    </div>
    )
}

Card.propTypes = {
    children: PropTypes.node.isRequired
}