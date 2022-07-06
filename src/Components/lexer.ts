interface params {
  [key: string]: {
    reg: string
    type: string
  }
}

const inline_signs: params = {
  '**': {
    reg: '\\*{2,2}(.+?)\\*{2,2}',
    type: 'emphasis'
  },
  '~~': {
    reg: '~{2,2}(.+?)~{2,2}',
    type: 'strikethrough'
  },
  '[]()': {
    reg: '\\[(.+?)\\]\\((.+?)\\)',
    type: 'url'
  },
  '![]()': {
    reg: '!\\[(.+?)\\]\\((.+?)\\)',
    type: 'image'
  }
}

type Branch = {
  type: string,
  content: string,
  additional_content?: string,
  sign?: string,
  ref? : HTMLSpanElement|undefined
  children: Branch[]
}

const generateChildren = (sentence: string, sign?: string) => {
  var children: Branch[] = []
  var regSign = ''
  var regStartPosition: number = sentence.length

  // Check which sign hit first
  Object.keys(inline_signs).forEach(sign => {
    const reg = new RegExp(inline_signs[sign].reg)
    const position = sentence.search(reg)

    if(position > -1 && position < regStartPosition){
      regStartPosition = position
      regSign = sign
    }
  })

  if(regSign !== ''){
    const reg = new RegExp('(^.*?)'+inline_signs[regSign].reg)
    const split = sentence.split(reg)
    split.shift()

    if(regSign !== ('url' || 'image')){
      children.push({type: 'text', content: split[0], children: []})
      children.push({type: inline_signs[regSign].type, content: split[1], sign: regSign, children: []})
      if(split[2] !== '') children = children.concat(generateChildren(split[2]))
    }
  }
  else children.push({type: 'text', content: sentence, children: []})

  if(sign){
    children.splice(0, 0, {type: 'sign', content: sign, children: []})
    children.push({type: 'sign', content: sign, children: []})
  }

  return children
}

export const Lexer = (branch: Branch) => {
  var children: Branch[]

  if(branch.sign) children = generateChildren(branch.content, branch.sign)
  else children = generateChildren(branch.content)

  branch.children = children

  children.forEach(child => {
    if(child.type !== 'text' && child.type !== 'sign') Lexer(child)
  })

  return branch
}