// src/test-utils.tsx
import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

//creates a wrapper component providing routing context
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
};

//wraps the component with AllTheProviders
const customRender = (ui: ReactElement, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export all testing library functions
export * from '@testing-library/react';

// override render method
export { customRender as render };
