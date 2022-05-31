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
  strong: {
    del: '\\*\\*',
    type: 'bold',
  },
  equation: {
    del: '\\$',
    type: 'equation',
  },
}

export const inline_lexer = (sentence: string) => {
  var splited: {type: string, content: string}[] = []
  Object.keys(inline_params).some(key => {

    const reg = new RegExp('^([^' + inline_params[key].del + ']*)' + inline_params[key].del + '(.*)')

    if(sentence.match(reg)){
      var split_sentence = sentence.split(reg)

      splited.push({type: 'plain', content: split_sentence[1]})
      splited.push({type: inline_params[key].type,content: ''})
      splited = splited.concat(inline_lexer(split_sentence[2]))
      
      return true
    }
  })
  if(splited.length === 0) splited.push({type: 'plain', content: sentence})
  return splited
}

export const head_lexer = (sentence: string) => {
  var splited: {type: string, content: string}[] = []
  Object.keys(head_params).some(key => {
    const reg = new RegExp('^' + head_params[key].del)

    if(sentence.match(reg)){
      var split_sentence = sentence.split(reg)

      splited.push({type: head_params[key].type,content: sentence.match(reg)![0]})
      splited = splited.concat(head_lexer(split_sentence[1]))

      return true
    }
  })
  if(splited.length === 0) splited.push({type: 'plain', content: sentence})
  return splited
}

export const inline_parser = (sentence: string) => {
  var split_sentence: {type: string, content: string}[] = inline_lexer(sentence)
  var parsed: {type: string, content:string}[] = []
  var current_type = 'plain'
  var current_content = ''
  split_sentence.forEach(content => {
    current_content += content.content
    if(content.type !== 'plain'){
      if(current_type === 'plain') {parsed.push({type: 'plain', content: current_content});current_type = content.type; current_content = ''}
      else if(current_type === content.type) {parsed.push({type: current_type, content: current_content});current_type = 'plain'; current_content = ''}
    }
  })
  parsed.push({type: 'plain', content: current_content});
  console.log(parsed)
}