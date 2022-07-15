import { Parser } from "../../Utils/TextParser"
import { Accessor, children, createSignal, Setter } from "solid-js"

type lengthTree = {
  start: number,
  end: number,
  children: lengthTree[]
}

export default class Node {
  private nodeTree: Accessor<nodeTree>
  private setnodeTree: Setter<nodeTree>
  constructor(text: string){
    [this.nodeTree, this.setnodeTree] = createSignal(this.generateTree(Parser({type: 'root', content: text, children: []})))
  }

  tree = () => {
    return this.nodeTree()
  }

  set = (text?: string) => {
    if(!text) text = this.innerText()
    const branch = Parser({type: 'root', content: text, children: []})
    this.setnodeTree(this.generateTree(branch))
  }

  list = () => {
    return this.generateRefList(this.nodeTree())
  }

  innerText = () => {
    return this.list()!.map(node => node?.innerText).join('')
  }

  private generateTree = (branch: SyntaxTree, start: number = 0, tree: nodeTree = {type: 'root', content: 'root', children: []}) => {
    const nodeLength = (node: SyntaxTree) => {
      if(node.start_sign) return node.start_sign.length + node.content.length + node.end_sign!.length
      return node.content.length
    }

    tree.start = start
    tree.end = start + nodeLength(branch)
    
    if(branch.children.length === 0) tree.ref = undefined
    else{
      var newStart = start ? start : 0
      tree.children = branch.children.map((child, index) => {
        newStart += (index > 0 ? nodeLength(branch.children[index-1]) : 0)
        if(Object.keys(child).includes('additional_content')) return this.generateTree(child, newStart, {type: child.type, content: child.content, additional_content: child.additional_content, children: []})
        else return this.generateTree(child, newStart, {type: child.type, content: child.content, children: []})
      })
    }

    return tree
  }

  private generateRefList = (node: nodeTree) => {
    var list: (HTMLSpanElement|undefined)[] = []
    if(document.contains(node.ref!)) list.push(node.ref)
    else{
      node.children.forEach(child => {
        list = list.concat(this.generateRefList(child))
      })
    }
    return list
  }

  private generateLengthTree = (branch: SyntaxTree, start: number = 0) => {
    const nodeLength = (node: SyntaxTree) => {
      if(node.start_sign) return node.start_sign.length + node.content.length + node.end_sign!.length
      return node.content.length
    }
  
    var node: lengthTree = {
      start: start,
      end: start + nodeLength(branch),
      children: []
    }
  
    var newStart = start ? start : 0
    node.children = branch.children.map((child, index: number) => {
      newStart += (index > 0 ? nodeLength(branch.children[index-1]) : 0)
      return this.generateLengthTree(child, newStart)
    })
  
    return node
  }
}