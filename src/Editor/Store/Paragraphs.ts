import { createStore, produce } from "solid-js/store";
import { ulid } from 'ulid'

type Paragraph = {
  id: string
  blocks: string[]
}

export default class Paragraphs {
  paragraphs: Paragraph[]
  setParagraphs: any
  constructor(paragraphs: Paragraph[]){
    [this.paragraphs, this.setParagraphs] = createStore(paragraphs)
  }

  get = (id: string) => {
    return this.paragraphs.find(paragraph => paragraph.id === id)
  }

  next_block = (block_id: string) => {
    const paragraph = this.paragraphs.find(paragraph => paragraph.blocks.find(id => id === block_id))
    if(!paragraph) return block_id
    const index = paragraph?.blocks.findIndex(id => id === block_id)
    if(index! < paragraph!.blocks.length) return paragraph!.blocks[index!+1]
    else return block_id
  }

  prev_block = (block_id: string) => {
    const paragraph = this.paragraphs.find(paragraph => paragraph.blocks.find(id => id === block_id))
    if(!paragraph) return block_id
    const index = paragraph?.blocks.findIndex(id => id === block_id)
    if(index !== 0) return paragraph!.blocks[index!-1]
    else return block_id
  }

  addBlock = (id: string, blockId: string, newBlockId: string) => {
    this.setParagraphs(
      (paragraph:Paragraph) => paragraph.id === id,
      produce((paragraph:Paragraph) => {
        const index = paragraph.blocks.findIndex(block => block === blockId)
        paragraph.blocks.splice(index+1, 0, newBlockId)
      })
    );
  };

  removeBlock = (id: string, blockId: string) => {
    this.setParagraphs(
      (paragraph:Paragraph) => paragraph.id === id,
      produce((paragraph:Paragraph) => {
        const index = paragraph.blocks.findIndex(block => block === blockId)
        paragraph.blocks.splice(index, 1)
      })
    );
  }
} 
