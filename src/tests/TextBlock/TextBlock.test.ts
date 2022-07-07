import { expect, test } from 'vitest'

import TextBlock from '../../Editor/Blocks/Text/TextBase';
import { cleanup, render, screen } from "solid-testing-library";

test('Render test', () => {
  render(() => TextBlock({id: "01G5JBTCC1JN8S3G4T8AA2FP2J"}))
});
