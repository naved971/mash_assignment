import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { useTheme } from 'styled-components';
import Text, { fontVariant } from './Text';

interface SelectProps {
  onPress: () => void;
  label: string;
  left?: ReactNode;
  value?: string;
  testID?: string;
}

const SelectWrapper = styled.TouchableOpacity`
  margin-vertical: 12px;
  height: 54px;
  padding: 12px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border-width: 1px;
  border-color: ${({ theme }) => theme.CoreChroma};
`;

const IconWrapper = styled.View`
  justify-content: center;
  align-items: center;
  margin-horizontal: 8px;
  width: 30px;
`;

const ContentWrapper = styled.View`
  flex: 1;
  align-items: flex-start;
`;

const Select: React.FC<SelectProps> = ({
  onPress,
  label,
  left,
  value,
  testID,
}: SelectProps): JSX.Element => {
  const theme = useTheme();

  const renderLeftIcon = () => left && <IconWrapper>{left}</IconWrapper>;

  const renderContent = () =>
    value ? (
      <>
        <Text variant={fontVariant.caption2}>{label}</Text>
        <Text variant={fontVariant.body1}>{value}</Text>
      </>
    ) : (
      <Text variant={fontVariant.body1}>{label}</Text>
    );

  return (
    <SelectWrapper onPress={onPress} activeOpacity={0.6} testID={testID}>
      {renderLeftIcon()}
      <ContentWrapper>{renderContent()}</ContentWrapper>
      <IconWrapper testID="iconContainer">
        <FontAwesomeIcon size={18} icon={faAngleRight} color={theme.TextPrime} />
      </IconWrapper>
    </SelectWrapper>
  );
};

export default Select;
