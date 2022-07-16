import { describe, expect, it } from 'vitest'
import { render } from 'solid-testing-library'

import Nodes from '../../Editor/Blocks/Text/Nodes'
import { inner, normal, refs, set } from './TestData'

import TestComponent from './TestComponent'

describe('Text Parse Normal', () => {
  it('tree test', () => {
    const nodes = new Nodes(normal.text)
    expect(nodes.tree()).toEqual(normal.tree)
  });

  it('refs test', () => {
    const nodes = new Nodes(refs.text)
    render(() => TestComponent({node: nodes.tree()}))

    expect(nodes.refs()).toEqual(refs.refs)
  });

  it('set test', () => {
    const nodes = new Nodes(refs.text);
    render(() => TestComponent({node: nodes.tree()}));
    nodes.set(set.text); 
    render(() => TestComponent({node: nodes.tree()}));

    expect(nodes.refs()).toEqual(set.refs);
  });

  it('innerText test', () => {
    const nodes = new Nodes(inner.text);
    render(() => TestComponent({node: nodes.tree()}));

    expect(nodes.innerTextforTesting()).toEqual(inner.text);
  });
});