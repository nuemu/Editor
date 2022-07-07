import { Lexer } from '../src/Components/Lexer';

test('test', () => {
  expect(Lexer({
    type: 'root',
    content: 'sample text',
    children: []
  })).toEqual({
    type: 'root',
    content: 'sample text',
    children: [
      {
        type: 'text',
        content: 'sample text',
        children: []
      },
    ]
  });
});