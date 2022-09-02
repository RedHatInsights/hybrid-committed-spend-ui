import { render, screen } from '@testing-library/react';
import React from 'react';

import SampleComponent from './SampleComponent';

test('expect sample-component to render children', () => {
  const children = <h1>Hello</h1>;

  render(<SampleComponent>{children}</SampleComponent>);
  expect(screen.getByRole('heading')).toHaveTextContent('Hello');
});
