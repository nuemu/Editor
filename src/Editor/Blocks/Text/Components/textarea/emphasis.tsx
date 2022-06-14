import { Component } from 'solid-js';
import { Dynamic } from "solid-js/web"

const components = import.meta.globEager('./*.tsx')

const style: any = {
  'font-weight': 'bolder'
}

const Emphasis: Component = (props: any) => {
  const {branch} = props

  return (
    <span
      class="emphasis"
      style={style}
    >
      {branch.children.map((child: {type:string, content:string, children: any[]}, index: number) => (
        <Dynamic
          component={components['./'+child.type+'.tsx'].default}
          branch={child}
        />
      ))}
    </span>
  )
}

export default Emphasis
