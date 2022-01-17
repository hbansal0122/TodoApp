import Button from "./Button"
import PropTypes from "prop-types"

const Header = ({ title, onClick, showAddButton }) => {
    return (
        <header className="header">
            <h2>{title}</h2>
            <Button color="green" text={showAddButton? "Hide Add": "Add"} onClick={onClick}/>
        </header>
    )
}

Header.defaultProps = {
    title: "Task Tracker"
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header
