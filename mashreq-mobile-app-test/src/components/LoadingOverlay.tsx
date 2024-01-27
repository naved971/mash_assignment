import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';

const LoadingOverlay = () => {
  const theme = useTheme();
  const styles = useStyles();

  return (
    <View style={styles.overlay} testID="LoadingOverlay">
      <ActivityIndicator size="large" color={theme.CoreChroma} />
    </View>
  );
};

const useStyles = () =>
  StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default LoadingOverlay;
