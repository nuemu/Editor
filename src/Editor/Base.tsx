import type { Component } from 'solid-js';

import Paragraph from './Paragraph';

const Base: Component = () => {
  return (
    <div style={{width: '80%', left: '10%', position: 'relative'}}><Paragraph /></div>
  )
}

export default Base
