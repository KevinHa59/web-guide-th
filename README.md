# web-guide-th

> a user-friendly npm library designed to enhance website introductions. With WebGuide, developers can effortlessly create interactive sequences that highlight specific elements of their web systems, accompanied by informative descriptions. Users can navigate through the guided tour with ease using next and previous buttons, making it an ideal tool for onboarding new visitors or showcasing key features of your website.

[![NPM](https://img.shields.io/npm/v/web-guide-th.svg)](https://www.npmjs.com/package/web-guide-th) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save web-guide-th
```

## Usage

```jsx
import React, { Component } from 'react'

import WebGuide from 'web-guide-th'

class Example extends Component {
  data = [
    {
      id: 'com_1',
      description: 'com_1',
      position: 'bottom'
    },
    {
      id: 'com_2',
      description: 'com_2',
      position: 'left start'
    }
  ]
  render() {
    return <WebGuide active={true} data={data} />
  }
}
```

## Parameters

| Parameter         | _Type_             | Description                                       |
| ----------------- | ------------------ | ------------------------------------------------- |
| active            | boolean            | Enable/disable guide                              |
| data              | array              | List of guides                                    |
| step              | number             | State to control step                             |
| defaultStep       | number             | Initial step on load                              |
| GuideDialogProps  | object             | Props for customizing the guide dialog            |
| - gap             | pixel value        | Space between focus area and guide dialog         |
| - padding         | pixel value        | Space around focus area                           |
| - isSmooth        | boolean            | Smooth moving between steps                       |
| - background      | string             | Hex or RGB color code for background              |
| - styleOuter      | object             | CSS style of outer area                           |
| customGuideDialog | component function | Function for rendering a custom guide dialog      |
| onCompleteGuide   | callback function  | Callback fired when reaching the end of the guide |

## License

MIT © [KevinHa59](https://github.com/KevinHa59)
