import React from 'react';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components';
import { StyleSheet, TextProps as RNTextProps } from 'react-native';

export const enum fontVariant {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  subtitle1 = 'subtitle1',
  subtitle2 = 'subtitle2',
  body1 = 'body1',
  body2 = 'body2',
  caption1 = 'caption1',
  caption2 = 'caption2',
  captionBold = 'captionBold',
  button = 'button',
}

interface TypographyProps {
  color?: string;
}

const Typography = styled.Text<TypographyProps>`
  color: ${(props) => props.color || props.theme.TextPrime};
`;

interface TextProps {
  variant: fontVariant;
  children?: React.ReactNode;
  color?: string;
}

const Text: React.FC<TextProps> = ({ variant, children, color }: TextProps): JSX.Element => {
  const theme = useTheme();
  const styles: Record<fontVariant, RNTextProps['style']> = getStyles();
  return (
    <Typography color={color} style={styles[variant]}>
      {children}
    </Typography>
  );
};

const getStyles = () =>
  StyleSheet.create({
    h1: {
      fontSize: 34,
      fontWeight: 'bold',
    },
    h2: {
      fontSize: 28,
      fontWeight: 'bold',
    },
    h3: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    h4: {
      fontSize: 18,
      fontWeight: '600',
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: '600',
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: '600',
    },
    body1: {
      fontSize: 16,
      fontWeight: '400',
    },
    body2: {
      fontSize: 14,
      fontWeight: '400',
    },
    caption1: {
      fontSize: 12,
      fontWeight: '400',
    },
    caption2: {
      fontSize: 10,
      fontWeight: '400',
    },
    captionBold: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    button: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default Text;
