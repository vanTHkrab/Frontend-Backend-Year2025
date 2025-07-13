import React from "react";

function DisplayMessage({ message, messageColor }) {
    if (!message) return null;

    const hexToColor = (color) => {
        if (color === "red") return '#ef4444';
        if (color === "green") return '#22c55e';
        return '#f97316';
    }

    const getBackgroundColor = () => {
        return hexToColor(messageColor) + '1A';
    };

    const getBorderColor = () => {
        return hexToColor(messageColor);
    };

    const getTextColor = () => {
        return hexToColor(messageColor);
    };

    return (
        <div style={{
            marginTop: '16px',
            padding: '12px',
            borderRadius: '6px',
            borderLeft: `4px solid ${getBorderColor()}`,
            backgroundColor: getBackgroundColor()
        }}>
            <p style={{
                fontWeight: '500',
                color: getTextColor(),
                margin: 0
            }}>
                {message}
            </p>
        </div>
    );
}

export { DisplayMessage };