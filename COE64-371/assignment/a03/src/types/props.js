import PropTypes from "prop-types";

export const props = {
    DisplayMessage: {
        message: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["success", "error", "info"]).isRequired,
    },
    Button: {
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    },
    InputField: {
        type: PropTypes.string,
        placeholder: PropTypes.string,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    },
}