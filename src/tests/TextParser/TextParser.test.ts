import { describe, expect, it } from 'vitest'

import { Lexer } from '../../Components/TextParser';
import { emphasis, normal, url } from './TestData';

describe('Text Parse Normal', () => {
  it('normal text parse test', () => {
    expect(Lexer(normal.root)).toEqual(normal.tree);
  });

  it('emphasis parse test', () => {
    expect(Lexer(emphasis.root)).toEqual(emphasis.tree);
  });

  it('url parse test', () => {
    expect(Lexer(url.root)).toEqual(url.tree);
  }); 
});