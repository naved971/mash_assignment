import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Modal from './Modal';
import Button from './Button';
import { useTranslation } from 'react-i18next';
import { Countries, CountryImages } from '../config/constants';
import Text, { fontVariant } from './Text';

interface CountriesModalProps {
    countriesModalVisible: boolean;
    setCountriesModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onCountrySelect: (country: string) => void;
}

interface RenderItemProps {
    item: string;
    index: number;
}

const CountriesModal: React.FC<CountriesModalProps> = ({
    countriesModalVisible,
    setCountriesModalVisible,
    onCountrySelect,
}: CountriesModalProps): JSX.Element => {
    const { t } = useTranslation();
    const styles = useStyles();

    const renderItem = ({ item, index }: RenderItemProps) => (
        <TouchableOpacity
            onPress={() => onCountrySelect(item)}
            style={styles.listItem}
            activeOpacity={0.7}
            testID={`countryListItem_${index}`}
        >
            <Image source={CountryImages[item]} style={styles.countryImage} />
            <Text variant={fontVariant.body2}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <Modal {...{ modalVisible: countriesModalVisible, setModalVisible: setCountriesModalVisible }}>
            <View style={styles.childContainer}>
                <View style={styles.childTopContainer}>
                    <Text variant={fontVariant.h4}>{t('chooseCountry')}</Text>
                    <View style={styles.listContainer}>
                        <FlatList
                            data={Object.keys(Countries)}
                            renderItem={(item) => renderItem(item)}
                            keyExtractor={(item, index) => `${item}${index}`}
                            ItemSeparatorComponent={() => null}
                        />
                    </View>
                </View>

                <Button onPress={() => setCountriesModalVisible(false)} title={t('close')} />
            </View>
        </Modal>
    );
};

const useStyles = () =>
    StyleSheet.create({
        childContainer:{
            flex:1,
            justifyContent:"space-between",
        },
        childTopContainer:{marginTop:40},

        listItem: {
            height: 54,
            alignItems: 'center',
            flexDirection: 'row',
        },
        listContainer: {
            marginVertical: 12,
        },
        countryImage: {
            width: 24,
            height: 24,
            resizeMode: 'contain',
            marginHorizontal: 6,
        },
    });

export default CountriesModal;
