interface params {
  [key: string]: any
}

const params: params = {
  h1: {
    del: '# ',
    head: true
  },
  h2: {
    del: '## ',
    head: true
  },
  h3: {
    del: '### ',
    head: true
  },
  list: {
    del: '-{(.*)} ',
    head: true
  },
  equation: {
    del: '\\$',
    head: false
  },
}

export const lexer = (sentence: string) => {
  var splited: string[] = []
  Object.keys(params).some(key => {

    // headのみに適用するか否かで正規表現を分離
    // 文中のは最初の１個だけヒットするように
    var reg = new RegExp('^([^' + params[key].del + ']*)' + params[key].del + '(.*)')
    if(params[key].head) reg = new RegExp('^' + params[key].del)

    if(sentence.match(reg)){
      var split_sentence = sentence.split(reg)
      if(params[key].head){
        splited.push(sentence.match(reg)![0])
        splited = splited.concat(lexer(split_sentence[1]))
      }
      else{
        splited.push(split_sentence[1])
        splited.push(params[key].del)
        splited = splited.concat(lexer(split_sentence[2]))
      }
      return true
    }
  })
  if(splited.length === 0) splited.push(sentence)
  return splited
}