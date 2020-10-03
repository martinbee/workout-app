import { DefaultTheme } from 'styled-components/native';

declare module 'styled-components' {
  export interface DefaultTheme {
    padding: {
      regular: string;
    };
  }
}

export default {
  padding: {
    regular: '15px',
  },
};
