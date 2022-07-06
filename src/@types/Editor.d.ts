type Branch = {
  type: string,
  content: string,
  additional_content?: string,
  sign?: string,
  ref? : HTMLSpanElement|undefined
  children: Branch[]
}

// caret ~ visible Accessor<T> not working ?
type TextBlockProps = {
  branch: Branch,
  caret: any,
  lengthTree: any,
  visible: any,
}