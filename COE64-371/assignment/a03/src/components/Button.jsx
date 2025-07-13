import React from "react";

function Button({children, onClick}) {
    return (
        <button
            onClick={onClick}
            style={{
                width: '100%',
                backgroundColor: '#3b82f6',
                color: 'white',
                fontWeight: 'bold',
                padding: '12px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                fontSize: '14px'
            }}
            onMouseOver={(e) => {
                e.target.style.backgroundColor = '#1d4ed8';
            }}
            onMouseOut={(e) => {
                e.target.style.backgroundColor = '#3b82f6';
            }}
        >
            {children}
        </button>
    );
}

export {Button};