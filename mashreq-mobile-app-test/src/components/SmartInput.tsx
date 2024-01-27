import React from 'react';
import { useTheme } from 'styled-components';
import { StyleSheet, TextInput, View, TextInputProps } from 'react-native';
import Text, { fontVariant } from './Text';

interface SmartInputProps extends TextInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  error?: string;
  helperText?: string;
  testID?: string;
}

const SmartInput: React.FC<SmartInputProps> = ({
  value = '',
  onChangeText,
  placeholder = '',
  keyboardType = 'default',
  error,
  helperText,
  testID,
  ...rest
}: SmartInputProps): JSX.Element => {
  const theme = useTheme();
  const styles = useStyles(theme, error);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor={theme.TextPrime}
        testID={testID}
        {...rest}
      />
      {error && (
        <View style={styles.helperContainer}>
          <Text color={theme.ErrorTextAlert} variant={fontVariant.caption1}>
            {error}
          </Text>
        </View>
      )}
      {helperText && (
        <View style={styles.helperContainer}>
          <Text color={theme.LightTextPrime} variant={fontVariant.caption1}>
            {helperText}
          </Text>
        </View>
      )}
    </View>
  );
};

const useStyles = (theme: any, error: any) =>
  StyleSheet.create({
    container: {
      marginVertical: 12,
    },
    input: {
      height: 54,
      borderWidth: 1,
      padding: 12,
      width: '100%',
      alignItems: 'center',
      borderColor: error ? theme.ErrorTextAlert : theme.CoreChroma,
      borderRadius: 8,
    },
    helperContainer: {
      marginTop: 4,
    },
  });

export default SmartInput;
