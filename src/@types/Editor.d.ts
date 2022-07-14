type SyntaxTree = {
  category?: string,
  type: string,
  content: string,
  additional_content?: string,
  start_sign?: string,
  middle_sign?: string,
  end_sign?: string
  children: SyntaxTree[]
}

type BlockBaseProps = {
  id: string,
  paragraph_id: string
}

/* TextBlock types */
type TextBlockProps = {
  node: nodeTree,
  caret: number,
  visible?: any,
  focus?: boolean
}

type nodeTree = {
  type: string
  content: string
  ref?: HTMLSpanElement | HTMLDivElement | undefined
  children: nodeTree[]
}

type text_styles = {
  [key: string]: any
}

/* Block types */