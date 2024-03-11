import React from 'react'

export default function IconButton({
  disabled,
  size = 'default',
  onClick,
  children
}) {
  const buttonSize = {
    width: '30px',
    height: '30px',
    fontSize: '20px',
    background: 'transparent',
    cursor: 'pointer'
  }
  if (size === 'small') {
    buttonSize.width = '20px'
    buttonSize.height = '20px'
    buttonSize.fontSize = '15px'
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        border: 'none',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...buttonSize
      }}
    >
      {children}
    </button>
  )
}
