import React from 'react'

import { WebGuide } from 'web-guide-th'
import 'web-guide-th/dist/index.css'

const comp_ids = [
  {
    id: 'com_1',
    description: 'com_1',
    position: 'bottom'
  },
  {
    id: 'com_2',
    description: 'com_2',
    position: 'left start'
  },
  {
    id: 'com_3',
    description: 'com_3',
    position: 'right'
  },
  {
    id: 'com_4',
    description: 'com_4',
    position: 'bottom'
  },
  {
    id: 'com_5',
    description: 'com_5',
    position: 'left'
  },
  {
    id: 'com_6',
    description: 'com_6',
    position: 'right'
  },
  {
    id: 'com_7',
    description: 'com_7',
    position: 'bottom'
  },
  {
    id: 'com_8',
    description: 'com_8',
    position: 'left'
  },
  {
    id: 'com_9',
    description: 'com_9',
    position: 'right'
  }
]

const App = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: '20px'
        // background: '#000'
      }}
    >
      <WebGuide active={true} data={comp_ids} />
      <Box id={'com_1'} width={'200px'} height={'150px'} left={100} />
      <Box id={'com_2'} width={'200px'} height={'250px'} left={230} />
      <Box id={'com_3'} width={'200px'} height={'150px'} left={940} />
      <Box id={'com_4'} width={'200px'} height={'150px'} left={50} />
      <Box id={'com_5'} width={'200px'} height={'150px'} left={712} />
      <Box id={'com_6'} width={'200px'} height={'150px'} left={328} />
      <Box id={'com_7'} width={'200px'} height={'150px'} left={50} />
      <Box id={'com_8'} width={'200px'} height={'150px'} left={712} />
      <Box id={'com_9'} width={'200px'} height={'150px'} left={328} />
    </div>
  )
}

export default App

function Box({ id, width, height, left }) {
  return (
    <div
      id={id}
      style={{
        width: width,
        height: height,
        marginLeft: left,
        background: 'rgba(0, 100,255, 1)'
      }}
    ></div>
  )
}
