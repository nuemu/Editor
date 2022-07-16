export const normal = {
  text: '**Sample**',
  tree: {
    type: 'root',
    content: 'root',
    start: 0,
    end: 10,
    children: [
      {
        type: 'strong',
        content: 'Sample',
        start: 0,
        end: 10,
        children: [
          {
            type: 'sign',
            content: '**',
            start: 0,
            end: 2,
            children: [],
            ref: undefined
          },
          {
            type: 'text',
            content: 'Sample',
            start: 2,
            end: 8,
            children: [],
            ref: undefined
          },
          {
            type: 'sign',
            content: '**',
            start: 8,
            end: 10,
            children: [],
            ref: undefined
          }
        ]
      }
    ]
  }
}

export const refs = {
  text: '**Sample**',
  refs: ['**','Sample','**'].map(content => {
    const span = document.createElement('span')
    const innerText = document.createTextNode(content)
    span.appendChild(innerText)
    return span
  })
}

export const inner = {
  text: '**Sample**',
}

export const set = {
  text: '~~Sample~~',
  refs: ['~~','Sample','~~'].map(content => {
    const span = document.createElement('span')
    const innerText = document.createTextNode(content)
    span.appendChild(innerText)
    return span
  })
}