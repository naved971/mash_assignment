import React, { ReactNode } from 'react';
import { useTheme } from 'styled-components';
import { View, Modal as RNModal, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface ModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  modalVisible,
  setModalVisible,
  children,
}: ModalProps): JSX.Element => {
  const theme = useTheme();
  const styles = useStyles(theme);

  return (
    <RNModal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.rootContainer} testID="rootContainer">
        <View style={styles.childContainer} testID="childContainer">
          {children}
        </View>
      </View>
    </RNModal>
  );
};

interface Styles {
  rootContainer: StyleProp<ViewStyle>;
  childContainer: StyleProp<ViewStyle>;
}

const useStyles = (theme: any): Styles =>
  StyleSheet.create({
    rootContainer: {
      flex: 1,
    },
    childContainer: {
      position: 'relative',
      flex:1,
      
      width: '100%',
      paddingVertical: 40,
      paddingHorizontal: 22,
      backgroundColor: theme.SubtleHuePrimary,
      borderRadius: 16,
      borderColor: theme.LuminousPrimary,
      borderWidth: 1,
    },
  });

export default Modal;
