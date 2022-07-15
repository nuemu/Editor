import { Accessor, Setter, createSignal } from "solid-js"
import Store from './Store'

const { paragraphs } = Store

export default class Focus {
  private focusingBlockId: Accessor<string>
  private setFocusingBlockId: Setter<string>

  constructor(){
    [this.focusingBlockId, this.setFocusingBlockId] = createSignal('none');
  }

  now = () => {
    return this.focusingBlockId()
  }

  set = (id: string) => {
    this.setFocusingBlockId(id)
  }

  next = () => {
    this.set(paragraphs.next_block(this.focusingBlockId()))
  }

  prev = () => {
    this.set(paragraphs.prev_block(this.focusingBlockId()))
  }
}