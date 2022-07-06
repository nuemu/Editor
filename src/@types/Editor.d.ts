type Branch = {
  type: string,
  content: string,
  additional_content?: string,
  start_sign?: string,
  middle_sign?: string,
  end_sign?: string
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