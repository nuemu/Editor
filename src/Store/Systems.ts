import { createRoot } from "solid-js";

import Caret from './Caret'
import Focus from './Focus'

/* Mixin... */

const system = () => {
  const caret = new Caret()
  const focus = new Focus()
  return { caret, focus }
}

export default createRoot(() => system())