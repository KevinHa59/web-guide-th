import React, { useContext } from 'react'
import { webGuideContext } from '..'
import { ArrowDown } from '../icons/arrow-down'
import { ArrowUp } from '../icons/arrow-up'
import { ArrowLeft } from '../icons/arrow-left'
import { ArrowRight } from '../icons/arrow-right'
import { X } from '../icons/x'
import IconButton from './icon-button'

export default function GuideDescription({ onStepChange, onEndTour }) {
  const { GuideDialogProps, data, step, customGuideDialog } =
    useContext(webGuideContext)
  const { position, title, description } = data[step]
  let Icon = null
  let styles = {
    position: 'absolute',
    background: GuideDialogProps?.background || '#fff',
    transition: GuideDialogProps?.isSmooth && 'ease 0.5s',
    zIndex: 1000
  }
  const posPart = position.split(' ')
  if (posPart[0] === 'top') {
    Icon = (
      <div style={{ position: 'absolute', top: 'calc(100% - 8px)' }}>
        <ArrowDown color={GuideDialogProps?.background || '#ffffff'} />
      </div>
    )
    styles = {
      ...styles,
      bottom: `calc(100% + ${GuideDialogProps?.gap}`,
      left: posPart[1] === undefined ? '50%' : posPart[1] === 'start' && 0,
      right: posPart[1] === 'end' && 0,
      transform: posPart[1] === undefined && 'translateX(-50%)'
    }
  } else if (posPart[0] === 'bottom') {
    Icon = (
      <div style={{ position: 'absolute', bottom: 'calc(100% - 8px)' }}>
        <ArrowUp color={GuideDialogProps?.background || '#ffffff'} />
      </div>
    )
    styles = {
      ...styles,
      top: `calc(100% + ${GuideDialogProps?.gap}`,
      left: posPart[1] === undefined ? '50%' : posPart[1] === 'start' && 0,
      right: posPart[1] === 'end' && 0,
      transform: posPart[1] === undefined && 'translateX(-50%)'
    }
  } else if (posPart[0] === 'right') {
    Icon = (
      <div style={{ position: 'absolute', right: 'calc(100% - 5px)' }}>
        <ArrowLeft color={GuideDialogProps?.background || '#ffffff'} />
      </div>
    )
    styles = {
      ...styles,
      left: `calc(100% + ${GuideDialogProps?.gap}`,
      top: posPart[1] === undefined ? '50%' : posPart[1] === 'start' && 0,
      bottom: posPart[1] === 'end' && 0,
      transform: posPart[1] === undefined && 'translateY(-50%)'
    }
  } else if (posPart[0] === 'left') {
    Icon = (
      <div style={{ position: 'absolute', left: 'calc(100% - 5px)' }}>
        <ArrowRight color={GuideDialogProps?.background || '#ffffff'} />
      </div>
    )
    styles = {
      ...styles,
      right: `calc(100% + ${GuideDialogProps?.gap})`,
      top: posPart[1] === undefined ? '50%' : posPart[1] === 'start' && 0,
      bottom: posPart[1] === 'end' && 0,
      transform: posPart[1] === undefined && 'translateY(-50%)'
    }
  }
  return (
    <div style={styles}>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '5px'
        }}
      >
        {Icon}
        {customGuideDialog !== null ? (
          customGuideDialog(data[step])
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(150,150,150,0.5)'
              }}
            >
              <span style={{ fontWeight: 'bold', fontSize: '12px' }}>
                {title || ''}
              </span>
              <IconButton size='small' onClick={() => onEndTour()}>
                <X />
              </IconButton>
            </div>
            <div
              style={{
                padding: '6px',
                width: '100%',
                ...GuideDialogProps.styleInner
              }}
            >
              {description}
            </div>
            {step === data.length - 1 && (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                <button
                  style={{
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer'
                  }}
                  onClick={() => onEndTour()}
                >
                  End Tour
                </button>
              </div>
            )}
            <div
              style={{
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 'max-content'
              }}
            >
              <IconButton
                disabled={step === 0}
                onClick={() => onStepChange(false)}
              >
                <ArrowLeft />
              </IconButton>
              <span
                style={{
                  fontSize: '12px',
                  width: 'max-content',
                  background: 'rgba(0,0,0,0.5)',
                  padding: '0 5px 0 5px',
                  borderRadius: '20px',
                  color: '#fff',
                  fontWeight: 'bold'
                }}
              >{`${step + 1}/${data.length}`}</span>
              <IconButton
                size='default'
                disabled={step === data.length - 1}
                onClick={() => onStepChange(true)}
              >
                <ArrowRight />
              </IconButton>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
