import * as React from 'react';
import styled from 'styled-components/native';

const StyledPage = styled.View`
  padding: ${(props) => props.theme.padding.regular};
`;

type Props = {
  children: React.ReactNode;
};

export default function Page({ children }: Props): JSX.Element {
  return <StyledPage>{children}</StyledPage>;
}
