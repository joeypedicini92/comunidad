import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'pwa-install': React.DetailedHTMLProps<any, HTMLElement>;
    }
  }
}
