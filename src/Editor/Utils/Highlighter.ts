import * as shiki from 'shiki'

class Highlighter {
  private highlighter: shiki.Highlighter
  constructor(highlighter: shiki.Highlighter){
    this.highlighter = highlighter
  }

  static build = async (theme: string) => {
    shiki.setCDN('https://unpkg.com/shiki/')
    const highlighter = await shiki.getHighlighter({ theme: theme })
    return new Highlighter(highlighter)
  }

  parse = (code: string, lang: string) => {
    return this.highlighter.codeToHtml(code, { lang: lang })
  }
}

const highlighter = await Highlighter.build('nord')

export default highlighter