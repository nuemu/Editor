import { Accessor, Setter, createSignal } from "solid-js"

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
}