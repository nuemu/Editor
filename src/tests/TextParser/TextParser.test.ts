import { describe, expect, it } from 'vitest'

import { Parser } from '../../Editor/Libraries/TextParser';
import { emphasis, normal, url } from './TestData';

describe('Text Parse Normal', () => {
  it('normal text parse test', () => {
    expect(Parser(normal.root)).toEqual(normal.tree);
  });

  it('emphasis parse test', () => {
    expect(Parser(emphasis.root)).toEqual(emphasis.tree);
  });

  it('url parse test', () => {
    expect(Parser(url.root)).toEqual(url.tree);
  }); 
});