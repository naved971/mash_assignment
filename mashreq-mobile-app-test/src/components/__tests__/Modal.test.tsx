import React from 'react';
import { render } from '@testing-library/react-native';
import Modal from '../Modal';
import { Text } from 'react-native';
import { mockTheme } from '../../config/testUtils';

jest.mock('styled-components', () => ({
  ...jest.requireActual('styled-components'),
  useTheme: () => (mockTheme),
}));

test('renders correctly when modal is visible', () => {
  const setModalVisibleMock = jest.fn();
  const modalVisible = true;

  const { getByTestId, getByText } = render(
      <Modal modalVisible={modalVisible} setModalVisible={setModalVisibleMock}>
        <Text testID="testContent">Test Content</Text>
      </Modal>
  );


  expect(getByTestId('rootContainer')).toBeTruthy();
  expect(getByTestId('childContainer')).toBeTruthy();

  // Assert the presence of specific content
  const testContentElement = getByText('Test Content');
  expect(testContentElement).toBeTruthy();
});

test('renders correctly when modal is not visible', () => {
  const setModalVisibleMock = jest.fn();
  const modalVisible = false;

  const { queryByTestId, queryByText } = render(
      <Modal modalVisible={modalVisible} setModalVisible={setModalVisibleMock}>
        <Text testID="testContent">Test Content</Text>
      </Modal>
  );

  expect(queryByTestId('rootContainer')).toBeNull();
  expect(queryByTestId('childContainer')).toBeNull();

  // Assert the absence of specific content
  const testContentElement = queryByText('Test Content');
  expect(testContentElement).toBeNull();
});

