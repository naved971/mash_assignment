import React from 'react';
import styled from 'styled-components/native';
import Text, { fontVariant } from './Text';
import { useTheme } from 'styled-components';

const ButtonContainer = styled.TouchableOpacity`
  margin-vertical: 8px;
  height: 54px;
  padding: 12px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.disabled ? props.theme.DISABLED_COLOR : props.theme.CoreChroma)};
`;

export const SimpleButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

interface ButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  testID?: string;
}

const Button: React.FC<ButtonProps> = ({ onPress, title, disabled, testID }: ButtonProps): JSX.Element => {
  const theme = useTheme();

  return (
    <ButtonContainer onPress={onPress} activeOpacity={0.6} disabled={disabled} testID={testID}>
      <Text color={theme.TextSecondary} variant={fontVariant.button}>
        {title}
      </Text>
    </ButtonContainer>
  );
};

export default Button;
