interface params {
  [key: string]: {
    reg: string
    type: string
    start_sign: string,
    middle_sign?: string,
    end_sign: string
  }
}

const inline_signs: params = {
  '**': {
    reg: '\\*{2,2}(.+?)\\*{2,2}',
    type: 'emphasis',
    start_sign: '**',
    end_sign: '**',
  },
  '~~': {
    reg: '~{2,2}(.+?)~{2,2}',
    type: 'strikethrough',
    start_sign: '~~',
    end_sign: '~~',
  },
  '$': {
    reg: '\\${1,1}(.+?)\\${1,1}',
    type: 'equation',
    start_sign: '$',
    end_sign: '$',
  },
  '[]()': {
    reg: '\\[(.+?)\\]\\((.+?)\\)',
    type: 'url',
    start_sign: '[',
    middle_sign: '](',
    end_sign: ')',
  },
}

const generateChildren = (sentence: string, signs?:{start?: string, middle?: string, end?: string}) => {
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

    const newChild: Branch = {
      type: inline_signs[regSign].type,
      content: split[1],
      start_sign: inline_signs[regSign].start_sign,
      end_sign: inline_signs[regSign].end_sign,
      children: []
    }
    children.push({type: 'text', content: split[0], children: []})
    
    if(inline_signs[regSign].type !== 'url' && inline_signs[regSign].type !== 'image'){
      children.push(newChild)
      if(split[2] !== '') children = children.concat(generateChildren(split[2]))
    }
    else{
      newChild.additional_content = split[2]
      newChild.end_sign = inline_signs[regSign].middle_sign+ split[2] +inline_signs[regSign].end_sign
      children.push(newChild)
      if(split[3] !== '') children = children.concat(generateChildren(split[3]))
    }
  }
  else children.push({type: 'text', content: sentence, children: []})

  if(signs){
    children.splice(0, 0, {type: 'sign', content: signs.start!, children: []})
    children.push({type: 'sign', content: signs.end!, children: []})
  }

  return children
}

export const Lexer = (branch: Branch) => {
  var children: Branch[]

  if(branch.start_sign) children = generateChildren(branch.content, {start: branch.start_sign, end: branch.end_sign})
  else children = generateChildren(branch.content)

  branch.children = children

  children.forEach(child => {
    if(child.type !== 'text' && child.type !== 'sign') Lexer(child)
  })

  return branch
}