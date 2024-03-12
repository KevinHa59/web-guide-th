import React, { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import GuideDescription from './components/guide-description'
import CoverArea from './components/cover-area'
import { SxPropTypes } from './props/css-props'

export const webGuideContext = createContext()
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
    styleInner: {
      minWidth: '200px',
      maxWidth: '400px'
    },
    styleOuter: {
      background: 'rgba(0,0,0,0.5)'
    }
  },
  customGuideDialog = null,
  onCompleteGuide
}) => {
  const [isActive, setIsActive] = useState(active)
  const [mainStep, setMainStep] = useState(defaultStep)
  const [bodyInfo, setBodyInfo] = useState(null)
  const [stepRect, setStepRect] = useState(null)
  const [pageWidth, setPageWidth] = useState(window.innerWidth)
  const [dialogProps, setDialogProps] = useState({
    gap: '0px',
    padding: '0px',
    isSmooth: true,
    background: '#ffffff',
    styleInner: {
      minWidth: '200px',
      maxWidth: '400px'
    },
    styleOuter: {
      background: 'rgba(0,0,0,0.5)'
    }
  })

  useEffect(() => {
    getBodyRect()
    const handleResize = () => {
      getBodyRect()
      setPageWidth(document.documentElement.scrollWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (GuideDialogProps) {
      setDialogProps((prev) => {
        return {
          ...prev,
          ...GuideDialogProps
        }
      })
    }
  }, [GuideDialogProps])

  useEffect(() => {
    handleActive(active)
  }, [active])

  useEffect(() => {
    if (step) {
      setMainStep(step)
    }
  }, [step])

  const getBodyRect = () => {
    if (active === true) {
      if (defaultStep) {
        setMainStep(defaultStep)
        handleGetStepInfo(defaultStep)
      } else {
        handleGetStepInfo(mainStep)
      }
    }
    const bodyRect = document.body.getBoundingClientRect()
    bodyRect.height = Math.max(bodyRect.height, window.innerHeight)
    setBodyInfo(bodyRect)
  }

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

  const handleActive = (_isActive) => {
    document.body.style.overflow = _isActive ? 'hidden' : 'auto'
    if (_isActive === false) {
      onCompleteGuide && onCompleteGuide()
    }
    setIsActive(_isActive)
  }
  return (
    isActive &&
    bodyInfo && (
      <webGuideContext.Provider
        value={{
          GuideDialogProps: dialogProps,
          customGuideDialog,
          data,
          step: mainStep
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: pageWidth,
            left: 0,
            top: 0,
            height: bodyInfo?.height,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <CoverArea
            minHeight={`calc(${stepRect.top + window.pageYOffset}px - ${
              dialogProps?.padding || '0px'
            })`}
          />
          <div
            style={{
              width: '100%',
              display: 'flex',
              transition: dialogProps?.isSmooth && 'ease 0.5s'
            }}
          >
            <CoverArea
              minWidth={`calc(${stepRect.left + window.pageXOffset}px - ${
                dialogProps?.padding || '0px'
              })`}
            />
            <div
              style={{
                transition: dialogProps?.isSmooth && 'ease 0.5s',
                minWidth: stepRect.width,
                height: stepRect.height,
                position: 'relative',
                padding: dialogProps?.padding || '0px',
                transformOrigin: 'center'
              }}
            >
              <GuideDescription
                onStepChange={handleChangeStep}
                onEndTour={() => handleActive(false)}
              />
            </div>

            <CoverArea width='100%' />
          </div>
          <CoverArea height='100%' />
        </div>
      </webGuideContext.Provider>
    )
  )
}

// Define the shape of GuideDialogProps
const GuideDialogPropTypes = {
  gap: PropTypes.string,
  padding: PropTypes.string,
  isSmooth: PropTypes.bool,
  background: PropTypes.string,
  styleInner: PropTypes.shape(SxPropTypes),
  styleOuter: PropTypes.shape(SxPropTypes)
}

WebGuide.propTypes = {
  active: PropTypes.bool,
  step: PropTypes.number,
  defaultStep: PropTypes.number,
  data: PropTypes.any.isRequired,
  GuideDialogProps: PropTypes.shape(GuideDialogPropTypes),
  customGuideDialog: PropTypes.element,
  onCompleteGuide: PropTypes.func
}
