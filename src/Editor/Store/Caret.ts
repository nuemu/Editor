import { Accessor, Setter, createSignal } from "solid-js"

export default class Caret {
  private caretOffset: Accessor<number>
  private setCaretOffset: Setter<number>

  constructor(){
    [this.caretOffset, this.setCaretOffset] = createSignal(0);
  }

  offset = () => {
    return this.caretOffset()
  }

  force = (offset: number) => {
    this.setCaretOffset(offset)
  }
  
  preserveOffset = (refs: HTMLSpanElement[], diff?: number) => {
    const caretPosition = diff ? this.getCaretPosition(refs) + diff : this.getCaretPosition(refs)
    this.setCaretOffset(caretPosition)
  }

  private getNodeCaretOn = (text: string, list: HTMLSpanElement[]) => {

    const returnNode = (element: HTMLSpanElement) => {
      if(element){
        if(element.childNodes.length === 0) element.appendChild(document.createTextNode(''))
        return element.childNodes[0]
      }
      else return null
    }

    // When Caret is on last
    if(this.caretOffset() >= text.length){
      return returnNode(list[list.length-1]!)
    }

    var textLengthTotal: number = 0
    var currentElement: HTMLSpanElement | undefined

    var index = 0
    for(const ref of list){
      textLengthTotal += ref?.innerText.length || 0
      if(textLengthTotal > this.caretOffset()){
        if(index !== 0) currentElement = list[index]
        else currentElement = list[0]
        break
      }
      index ++
    }

    return returnNode(currentElement!)
  }

  private getCaretOffsetOnNode = (list: HTMLSpanElement[], innerText: string) => {
    var previousTextLengthTotal: number = 0
    var textLengthTotal: number = 0
    var caretPosition: number = 0
    for(const ref of list){
      textLengthTotal += ref?.innerText.length || 0
      if(textLengthTotal > this.caretOffset()){
        caretPosition = this.caretOffset()-previousTextLengthTotal
        break
      }
      else if(this.caretOffset() === innerText.length){
        caretPosition = this.caretOffset()-previousTextLengthTotal
      }
      previousTextLengthTotal += ref?.innerText.length || 0
    }

    return caretPosition
  }

  setPosition = (innerText: string, refs: HTMLSpanElement[]) => {
    const selection = window.getSelection()
    const range = document.createRange()
    if(this.getNodeCaretOn(innerText, refs)){
      range.setStart(this.getNodeCaretOn(innerText, refs)!, this.getCaretOffsetOnNode(refs, innerText))
      range.collapse(true)
      selection!.removeAllRanges()
      selection!.addRange(range)
    }
  }

  private getCaretPosition = (refs: HTMLSpanElement[]) => {
    const selection: Selection | null = window.getSelection()
    var textLength: number = 0
    var caretPosition: number = 0

    refs.forEach(ref => {
      if(selection?.anchorNode?.parentElement === ref){
        // When delete only one letter, insert '\n' ... (Content Editable ?)
        caretPosition = textLength + (selection?.anchorNode?.nodeValue === '\n' ? 0 : selection?.anchorOffset || 0)
      }
      textLength += ref?.innerText.length || 0
    })

    return caretPosition
  }
}