import { Accessor, createSignal, Setter } from "solid-js";


export class Caret {
  private caret: Accessor<number>
  private setCaret: Setter<number>

  constructor(){
    [this.caret, this.setCaret] = createSignal(0)
  }

  set(){

  }

  setData(position: number){
    this.setCaret(position)
  }
}