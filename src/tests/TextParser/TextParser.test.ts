import { describe, expect, it } from 'vitest'

import { Parser } from '../../Editor/Utils/TextParser';
import { strong, normal, url } from './TestData';

describe('Text Parse Normal', () => {
  it('normal text parse test', () => {
    expect(Parser(normal.root)).toEqual(normal.tree);
  });

  it('strong parse test', () => {
    expect(Parser(strong.root)).toEqual(strong.tree);
  });

  it('url parse test', () => {
    expect(Parser(url.root)).toEqual(url.tree);
  }); 
});