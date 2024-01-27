import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Modal from './Modal';
import Button from './Button';
import { useTranslation } from 'react-i18next';
import { Languages, LanguagesImages } from '../config/constants';
import Text, { fontVariant } from './Text';

interface LanguagesModalProps {
    languageModalVisible: boolean;
    setLanguageModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onLanguageSelect: (language: string) => void;
}

interface RenderItemProps {
    item: string;
    index: number;
}

const LanguagesModal: React.FC<LanguagesModalProps> = ({
    languageModalVisible,
    setLanguageModalVisible,
    onLanguageSelect,
}: LanguagesModalProps): JSX.Element => {
    const { t } = useTranslation();
    const styles = getStyles();

    const renderItem = ({ item, index }: RenderItemProps) => (
        <TouchableOpacity
            onPress={() => onLanguageSelect(item)}
            style={styles.listItem}
            activeOpacity={0.7}
            testID={`languageListItem_${index}`}
        >
            <Image source={LanguagesImages[item]} style={styles.languageImage} />
            <Text variant={fontVariant.body2}>{t(`languages.${item}`)}</Text>
        </TouchableOpacity>
    );

    return (
        <Modal {...{ modalVisible: languageModalVisible, setModalVisible: setLanguageModalVisible }}>
            <View style={styles.childContainer}>
                <View style={styles.childTopContainer}>

                    <Text variant={fontVariant.h4}>{t('changeLanguage')}</Text>
                    <View style={styles.listContainer}>
                        <FlatList
                            data={Object.keys(Languages)}
                            renderItem={(item) => renderItem(item)}
                            keyExtractor={(item, index) => `${item}${index}`}
                            ItemSeparatorComponent={() => null}
                        />
                    </View>
                </View>

                <Button onPress={() => setLanguageModalVisible(false)} title={t('close')} />
            </View>
        </Modal>
    );
};

const getStyles = () =>
    StyleSheet.create({
        languageImage: {
            width: 24,
            height: 24,
            resizeMode: 'contain',
            marginHorizontal: 6,
        },
        listItem: {
            height: 54,
            alignItems: 'center',
            flexDirection: 'row',
        },
        listContainer: {
            marginVertical: 12,
        },
        childContainer: {
            flex: 1,
            justifyContent: "space-between",
        },
        childTopContainer: { marginTop: 40 },

    });

export default LanguagesModal;
