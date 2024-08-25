import QuranKemenag from 'quran-kemenag';
import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, Circle, Col, Line, Padder, Row, ScaledText, Gap } from 'urip-rn-kit';
import Images from '../../assets/num_bg.png';
import Colors from '../../constants/color.constant';
import { useNavigation } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
const HomeScreen = (props) => {
    const [listOfSurah, setListOfSurah] = useState([]);
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const quran = new QuranKemenag();
        const data = await quran.getListSurah();
        setListOfSurah(data);
    };

    const navigation = useNavigation();

    const BackIconWithImage = (props) => {
        return (
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Image
                    source={require('../../assets/hmibg.png')}
                    style={{ width: '100%', height: 160, borderRadius: 10 }}
                />
                <Image
                    source={require('../../assets/back.png')}
                    style={{
                        position: 'absolute',
                        top: 5,
                        width: 35,
                        height: 35,
                        left: 9,
                        tintColor: Colors.grey2,
                    }}
                />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ backgroundColor: Colors.white }}>
            <Padder>
                <BackIconWithImage navigation={props.navigation} />
            </Padder>
            <Searchbar
                placeholder="Pencarian..."
                placeholderTextColor={'green'}
                style={styles.searchbar}
                iconColor={'green'}
                inputStyle={styles.input}
            />
            <FlatList
                data={listOfSurah}
                keyExtractor={(s) => `${s.surah_id}`}
                renderItem={({ item, index }) => {
                    const onPress = () => {
                        props.navigation.navigate('DetailAlquran', { surahNumber: item.surah_id });
                    };
                    return <SurahItem key={index} data={item} onPress={onPress} />;
                }}
            />
        </SafeAreaView>
    );
};

const SurahItem = (props) => {
    return (
        <Col onPress={props.onPress}>
            <Padder horizontal={10}>
                <Row height={100}>
                    <Col justifyCenter>
                        <Box
                            backgroundImage={Images}
                            height={35}
                            width={35}
                            justifyCenter
                            alignCenter
                        >
                            <ScaledText size={10}>{props.data.surah_id}</ScaledText>
                        </Box>
                    </Col>
                    <Col size={3} justifyCenter>
                        <ScaledText size={18} bold>
                            {props.data.surah_name}
                        </ScaledText>
                        <ScaledText
                            color={Colors.grey2}
                        >{`${props.data.surah_verse_count} Ayat`}</ScaledText>
                    </Col>
                    <Col size={3} justifyCenter alignEnd>
                        <ScaledText color={Colors.purple1} size={20}>
                            {props.data.surah_name_arabic}
                        </ScaledText>
                    </Col>
                </Row>
                <Line size={1} color={Colors.line} />
            </Padder>
        </Col>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
        marginTop: -20,
    },
    searchbar: {
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 10,
    },
    input: {
        color: 'green',
    },
})
export default HomeScreen;
