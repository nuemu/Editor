interface params {
  [key: string]: any
}

const head_params: params = {
  h1: {
    del: '# ',
    type: 'head',
  },
  h2: {
    del: '## ',
    type: 'head',
  },
  h3: {
    del: '### ',
    type: 'head',
  },
  list: {
    del: '-{(.*)} ',
    type: 'list',
  },
}

const inline_params: params = {
  bold: {
    del: '\\*\\*',
    type: 'bold',
  },
  italics: {
    del: '\\*',
    type: 'italics',
  },
  equation: {
    del: '\\$',
    type: 'equation',
  },
  strike: {
    del: '~~',
    type: 'strike'
  },
}

export const inline_lexer = (currentType: string,sentence: string) => {
  var splited: {type: string, content: string}[] = []
  Object.keys(inline_params).some(key => {

    const reg = new RegExp('^([^' + inline_params[key].del + ']*)' + inline_params[key].del + '(.*)')

    if(sentence.match(reg)){
      var split_sentence = sentence.split(reg)

      splited.push({type: currentType, content: split_sentence[1]})
      splited.push({type: inline_params[key].type,content: ''})
      splited = splited.concat(inline_lexer(currentType, split_sentence[2]))
      
      return true
    }
  })
  if(splited.length === 0) splited.push({type: currentType, content: sentence})
  return splited
}

export const head_lexer = (currentType: string, sentence: string) => {
  var splited: {type: string, content: string}[] = []
  Object.keys(head_params).some(key => {
    const reg = new RegExp('^' + head_params[key].del)

    if(sentence.match(reg)){
      var split_sentence = sentence.split(reg)

      splited.push({type: head_params[key].type,content: sentence.match(reg)![0]})
      splited = splited.concat(head_lexer(currentType, split_sentence[1]))

      return true
    }
  })
  if(splited.length === 0) splited.push({type: currentType, content: sentence})
  return splited
}

export const inline_parser = (currentType: string, sentence: string) => {
  var split_sentence: {type: string, content: string}[] = inline_lexer(currentType, sentence)
  var parsed: {type: string, content:string}[] = []
  var current_type = currentType
  var current_content = ''
  split_sentence.forEach(content => {
    current_content += content.content
    if(content.type !== currentType){
      if(current_type === currentType) {parsed.push({type: currentType, content: current_content});current_type = content.type; current_content = ''}
      else if(current_type === content.type) {parsed.push({type: current_type, content: current_content});current_type = currentType; current_content = ''}
    }
  })
  parsed.push({type: currentType, content: current_content});
  return parsed
}