import { Accessor, createSignal, Setter } from "solid-js";

export default class Paragraph {
  paragraph: Accessor<Paragraph>
  setParagraph: Setter<Paragraph>
  constructor(paragraph: Paragraph){
    [this.paragraph, this.setParagraph] = createSignal(paragraph)
  }
}