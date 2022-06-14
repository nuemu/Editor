interface params {
  [key: string]: any
}

const head_signs: params = {
  h1: {
    reg: '# '
  },
  h2: {
    reg: '## '
  }
}

const inline_signs: params = {
  equation: {
    reg: '\\${1,1}(.+?)\\${1,1}',
    sign: '$'
  },
  emphasis: {
    reg: '\\*{2,2}(.+?)\\*{2,2}',
    sign: '**'
  },
  strikethrough: {
    reg: '~~(.+?)~~',
    sign: '~~'
  }
  /*url: {
    reg: '\\[(.+?)\\]{1,1}\\((.+?)\\){1,1}',
  }*/
}

type Branch = {
  type: string,
  content: string,
  option?: string,
  children: Branch[]
}

const generateChildren = (sentence: string) => {
  var splited_sentence: Branch[] = []

  var regStartPosition: number = sentence.length
  var regType: string = 'text'

  // Record which Reg hit first
  Object.keys(inline_signs).some(key => {
    const reg = new RegExp(inline_signs[key].reg)
    const position = sentence.search(reg)
    if(position > -1 && position < regStartPosition){
      regStartPosition = position
      regType = key
    }
  })

  // generate child branches
  if(regStartPosition < sentence.length){
    // Hit only first one
    const reg = new RegExp('(^.*?)'+inline_signs[regType].reg)
    const split = sentence.split(reg)
    if(split[1] !== '') splited_sentence.push({type: 'text', content: split[1], children:[]})

    if(regType === 'url'){
      splited_sentence.push({type: regType, content: split[2], option: split[3], children:[]})
      split[3] = split[4]
    }
    else splited_sentence.push({type: regType, content: split[2], children:[]})

    if(split[3] !== '') splited_sentence = splited_sentence.concat(generateChildren(split[3]))
  }
  else{
    if(sentence !== '') splited_sentence.push({type: 'text', content: sentence, children:[]})
  }

  return splited_sentence
}

export const checkHeadOfSentence = (sentence: string) => {
  var sign = ''
  Object.keys(head_signs).forEach((key: string) => {
    const reg = new RegExp('^'+head_signs[key].reg)
    if(sentence.match(reg)) sign = key
  })
  return sign
}

export const Lexer = (parent: Branch) => {
  var root = parent
  var sentence = parent.content

  var children = generateChildren(sentence)
  parent.children = children

  if(children.length !== 1 || (children.length == 1 && children[0].type !== 'text')){
    parent.content = ''
    parent.children.forEach(child => {
      Lexer(child)
    })
  }

  return root
}

export const additionalLexer = (element: HTMLElement, branch: Branch) => {
  element.childNodes.forEach((childNode, index) => {
    var childElement = childNode as HTMLElement
    if(childNode.nodeType === 1 && Object.keys(inline_signs).includes(childElement.className)){
      if(childElement.className !== 'equation') {
        if(reverseLexer(childElement)) additionalLexer(childElement, branch.children[index])
        else branch.children.splice(index, 1)
      }
      else branch.children[index].content = (childElement.children.item(1)! as HTMLElement).innerText
    }
    if(childNode.nodeType === 3 && childNode.nodeValue !== ''){
      branch.children[index].content = childNode.nodeValue!
      Lexer(branch.children[index])
    }
  })
  return branch
}

export const reverseLexer = (element: HTMLElement) => {
  var sentence:string[] = []
  element.childNodes.forEach(childNode => {
    var childElement = childNode as HTMLElement
    if(childNode.nodeType === 1 && Object.keys(inline_signs).includes(childElement.className)){
      if(childElement.className !== 'equation') {
        if(reverseLexer(childElement)) sentence.push(inline_signs[childElement.className].sign + reverseLexer(childElement) + inline_signs[childElement.className].sign)
      }
      else sentence.push(inline_signs[childElement.className].sign + (childElement.children.item(1)! as HTMLElement).innerText + inline_signs[childElement.className].sign)
    }
    if(childNode.nodeType === 3 && childNode.nodeValue !== '') sentence.push(childNode.nodeValue!)
  })
  return sentence.join('')
}