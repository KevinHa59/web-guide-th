import React from 'react'

import { WebGuide } from 'web-guide-th'
import 'web-guide-th/dist/index.css'

const comp_ids = [
  {
    id: 'introduction',
    title: 'Introduction',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.'
  },
  {
    id: 'article-body',
    title: 'Body',
    description:
      'Error doloremque maiores dolor suscipit excepturi voluptatum?',
    position: 'top start'
  },
  {
    id: 'article-conclusion',
    title: 'Conclusion',
    description:
      'iusto fugit accusantium modi est provident veniam labore incidunt architecto necessitatibus earum.',
    position: 'right start'
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
      }}
    >
      <WebGuide
        active={true}
        data={comp_ids}
        GuideDialogProps={{
          gap: '10px',
          padding: '1px',
          styleOuter: { backdropFilter: 'blur(5px)' }
        }}
        customGuideDialog={(current_step_data) => {
          return current_step_data.description
        }}
      />

      <div
        id='introduction'
        style={{
          marginBottom: '20px',
          backgroundColor: '#f9f9f9',
          border: '1px solid #ddd',
          padding: '10px'
        }}
      >
        <h2>Introduction</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque saepe
          dolorum hic magni vel esse nesciunt unde in ducimus, facere quas
          natus, illo nostrum delectus iusto harum dolores ut repellendus! Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Vitae eveniet eos,
          architecto quos impedit assumenda aut sapiente quam facilis aperiam
          odio recusandae accusamus illo voluptates id harum dicta labore rerum?
        </p>
      </div>

      <div
        id='article-body'
        style={{
          marginBottom: '20px',
          backgroundColor: ' #f9f9f9',
          border: '1px solid #ddd',
          padding: '10px',
          margin: '0 250px 0 250px'
        }}
      >
        <h2>Body</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat est
          error, ipsum sapiente sit nihil enim voluptatibus necessitatibus nemo
          provident quidem delectus iste magni unde minus eum et eaque facilis.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam
          maiores, quo enim porro doloremque reiciendis. Nisi consectetur
          perferendis porro nam eaque. Itaque, vel numquam hic iste nemo ipsa
          molestias quia? Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Quas culpa sapiente dignissimos sunt asperiores. Ut sunt nihil
          porro fugit dolorem labore necessitatibus nesciunt aliquid ipsum!
          Ducimus eos possimus dignissimos commodi. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Veritatis necessitatibus, sequi ea quae
          atque dolorum, sunt provident recusandae asperiores voluptates ipsa
          molestiae. Veritatis quo neque dignissimos repudiandae nobis id quasi!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae et
          laboriosam provident labore omnis ipsum voluptate quo tempore
          exercitationem porro optio, similique, molestias earum architecto
          deleniti maiores aperiam non recusandae? Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Maiores nam facilis, dolor quas a
          incidunt ipsam nesciunt sint pariatur illo animi vero optio provident?
          Maiores repellat doloribus voluptatibus dolore quibusdam!
        </p>
      </div>

      <div
        id='article-conclusion'
        style={{
          marginBottom: '20px',
          backgroundColor: '#f9f9f9',
          border: '1px solid #ddd',
          padding: '10px',
          width: '50%'
        }}
      >
        <h2>Conclusion</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse neque
          nobis maiores, omnis fuga ullam laborum! Reiciendis porro temporibus,
          quidem reprehenderit tenetur placeat alias consequuntur quaerat
          numquam id veritatis consectetur!
        </p>
      </div>
    </div>
  )
}

export default App
