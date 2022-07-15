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

  next = (block_id: string) => {
    this.set(paragraphs.next_block(block_id))
  }

  prev = (block_id: string) => {
    this.set(paragraphs.prev_block(block_id))
  }
}