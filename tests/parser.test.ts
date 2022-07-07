import { Lexer } from '../src/Components/TextParser';
import { emphasis, normal, url } from './parser_test_data';

test('normal text parse test', () => {
  expect(Lexer(normal.root)).toEqual(normal.tree);
});

test('emphasis parse test', () => {
  expect(Lexer(emphasis.root)).toEqual(emphasis.tree);
});

test('url parse test', () => {
  expect(Lexer(url.root)).toEqual(url.tree);
});