import React, { createContext, useContext, useEffect, useState } from 'react'

const webGuideContext = createContext()
export const WebGuide = ({
  active = true,
  step,
  defaultStep = 0,
  data,
  GuideDialogProps = {
    gap: '0px',
    padding: '0px',
    isSmooth: true,
    background: '#ffffff',
    styleOuter: {
      background: 'rgba(0,0,0,0.5)'
    }
  },
  customGuideDialog = null,
  onCompleteGuide
}) => {
  const [mainStep, setMainStep] = useState(defaultStep)
  const [bodyInfo, setBodyInfo] = useState(null)
  const [stepRect, setStepRect] = useState(null)
  useEffect(() => {
    if (defaultStep) {
      setMainStep(defaultStep)
      handleGetStepInfo(defaultStep)
    } else {
      handleGetStepInfo(mainStep)
    }
    const bodyRect = document.body.getBoundingClientRect()
    setBodyInfo(bodyRect)
  }, [])

  useEffect(() => {
    if (step) {
      setMainStep(step)
    }
  }, [step])

  const handleChangeStep = (isForward = true) => {
    const newStep = mainStep + (isForward ? 1 : -1)
    if (newStep === data.length) {
      onCompleteGuide && onCompleteGuide()
    } else if (newStep >= 0) {
      handleGetStepInfo(newStep)
      setMainStep(newStep)
    }
  }

  const handleGetStepInfo = (_step) => {
    const element = document.getElementById(data[_step].id)
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    })
    const rect = element.getBoundingClientRect()
    setStepRect(rect)
  }
  return (
    active &&
    bodyInfo && (
      <webGuideContext.Provider
        value={{
          GuideDialogProps,
          customGuideDialog,
          data,
          step: mainStep
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            left: 0,
            top: 0,
            height: bodyInfo?.height,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <CoverArea
            minHeight={`calc(${stepRect.top + window.pageYOffset}px - ${
              GuideDialogProps?.padding || '0px'
            })`}
          />
          <div
            style={{
              width: '100%',
              display: 'flex',
              transition: GuideDialogProps?.isSmooth && 'ease 0.5s'
            }}
          >
            <CoverArea
              minWidth={`calc(${stepRect.left}px - ${
                GuideDialogProps?.padding || '0px'
              })`}
            />
            <div
              style={{
                transition: GuideDialogProps?.isSmooth && 'ease 0.5s',
                minWidth: stepRect.width,
                height: stepRect.height,
                position: 'relative',
                padding: GuideDialogProps?.padding || '0px',
                transformOrigin: 'center',
                border: '1px solid #fff'
              }}
            >
              <DescArea onStepChange={handleChangeStep} />
            </div>

            <CoverArea width='100%' />
          </div>
          <CoverArea height='100%' />
        </div>
      </webGuideContext.Provider>
    )
  )
}

function CoverArea({ width, minWidth, height, minHeight }) {
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

function DescArea({ onStepChange }) {
  const { GuideDialogProps, data, step, customGuideDialog } =
    useContext(webGuideContext)
  const { position, description } = data[step]
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
          padding: '10px'
        }}
      >
        {Icon}
        {customGuideDialog !== null ? (
          customGuideDialog(data[step])
        ) : (
          <div>
            {description}
            <div style={{ display: 'flex', gap: '20px' }}>
              <button disabled={step === 0} onClick={() => onStepChange(false)}>
                <ArrowLeft />
              </button>
              {`${step + 1}/${data.length}`}
              <button
                disabled={step === data.length - 1}
                onClick={() => onStepChange(true)}
              >
                <ArrowRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ArrowRight({ color }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill={color}
      class='bi bi-caret-right-fill'
      viewBox='0 0 16 16'
    >
      <path d='m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z' />
    </svg>
  )
}
function ArrowLeft({ color }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill={color}
      class='bi bi-caret-left-fill'
      viewBox='0 0 16 16'
    >
      <path d='m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z' />
    </svg>
  )
}
function ArrowUp({ color }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill={color}
      class='bi bi-caret-up-fill'
      viewBox='0 0 16 16'
    >
      <path d='m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z' />
    </svg>
  )
}
function ArrowDown({ color }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill={color}
      class='bi bi-caret-down-fill'
      viewBox='0 0 16 16'
    >
      <path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z' />
    </svg>
  )
}
