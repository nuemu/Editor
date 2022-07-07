export const normal = {
  root: {
    type: 'root',
    content: 'sample text',
    children: []
  },
  tree: {
    type: 'root',
    content: 'sample text',
    children: [
      {
        type: 'text',
        content: 'sample text',
        children: []
      },
    ]
  }
}

export const url = {
  root: {
    type: 'root',
    content: '[url1](url2) text',
    children: []
  },
  tree: {
    type: 'root',
    content: '[url1](url2) text',
    children: [
      {
        type: 'text',
        content: '',
        children: []
      },
      {
        type: 'url',
        content: 'url1',
        additional_content: 'url2',
        start_sign: '[',
        end_sign: '](url2)',
        children: [
          {
            type: 'sign',
            content: '[',
            children: []
          },
          {
            type: 'text',
            content: 'url1',
            children: []
          },
          {
            type: 'sign',
            content: '](url2)',
            children: []
          },
        ]
      },
      {
        type: 'text',
        content: ' text',
        children: []
      },
    ]
  }
}

export const emphasis = {
  root: {
    type: 'root',
    content: '**emphasis** text',
    children: []
  },
  tree: {
    type: 'root',
    content: '**emphasis** text',
    children: [
      {
        type: 'text',
        content: '',
        children: []
      },
      {
        type: 'emphasis',
        content: 'emphasis',
        start_sign: '**',
        end_sign: '**',
        children: [
          {
            type: 'sign',
            content: '**',
            children: []
          },
          {
            type: 'text',
            content: 'emphasis',
            children: []
          },
          {
            type: 'sign',
            content: '**',
            children: []
          },
        ]
      },
      {
        type: 'text',
        content: ' text',
        children: []
      },
    ]
  }
} 