import { describe, expect, it } from 'vitest'
import { render } from 'solid-js/web';

import Nodes from '../../Editor/Blocks/Text/Nodes'
import { normal } from './TestData'

describe('Text Parse Normal', () => {
  it('test', () => {
    const nodes = new Nodes(normal.text)
    expect(nodes.tree()).toEqual(normal.tree)
  });
});