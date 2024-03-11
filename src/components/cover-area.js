import React, { useContext } from 'react'
import { webGuideContext } from '..'

export default function CoverArea({ width, minWidth, height, minHeight }) {
  const { GuideDialogProps } = useContext(webGuideContext)
  return (
    <div
      style={{
        width,
        minWidth,
        height,
        minHeight,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        transition: GuideDialogProps?.isSmooth && 'ease 0.5s',
        ...GuideDialogProps?.styleOuter
      }}
    />
  )
}
