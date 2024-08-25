import QuranKemenag from 'quran-kemenag';
import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import {
    Box,
    Col,
    Gap,
    ImgIcon,
    Line,
    Padder,
    Row,
    Circle,
    ScaledText,
} from 'urip-rn-kit';
import Icons from '../../assets/gruplogo.jpg';
import Images from '../../assets/hmi.png';
import Colors from '../../constants/color.constant';

const DetailScreen = (props) => {
    const [surah, setSurah] = useState(null);
    const [verses, setVerses] = useState([]);

    useEffect(() => {
        const { surahNumber } = props.route.params;
        getData(surahNumber);
    }, []);

    const getData = async (surah_id) => {
        const quran = new QuranKemenag();
        const data = await quran.getSurah(surah_id);
        setSurah(data);
        setVerses(data.verses || []);
    };

    return (
        <SafeAreaView style={{ backgroundColor: Colors.white }}>
            <Row height={50} style={{marginTop: 28}}>
                <Col justifyCenter alignCenter>
                    <ImgIcon
                        onPress={() => props.navigation.goBack()}
                        source={require('../../assets/back.png')}
                        size={35}
                        tintColor={Colors.grey2}
                    />
                </Col>
                <Col size={5} justifyCenter>
                    <ScaledText size={21} bold color={Colors.purple1}>
                        {surah ? surah.surah_name : ''}
                    </ScaledText>
                </Col>
            </Row>
            <Padder horizontal={20}>
                <Box
                    justifyCenter
                    alignCenter
                    borderRadius={10}
                    height={100}
                    fullWidth
                    backgroundImage={require('../../assets/bghmi1.jpg')}
                >
                    <ScaledText color={Colors.white} size={20} bold>
                        {surah ? surah.surah_name : ''}
                    </ScaledText>
                    <ScaledText color={Colors.white} size={18}>
                        {surah ? surah.surah_name_bahasa : ''}
                    </ScaledText>
                    <ScaledText color={Colors.white} size={13}>
                        {surah ? `${surah.surah_verse_count} AYAT` : ''}
                    </ScaledText>
                </Box>
            </Padder>
            <Gap size={20} vertical />
            <FlatList
                data={verses}
                keyExtractor={(v) => v.verse_id}
                renderItem={({ item, index }) => {
                    return <VerseItem key={index} data={item} />;
                }}
                ListFooterComponent={<Gap vertical size={200} />}
            />
        </SafeAreaView>
    );
};

const VerseItem = (props) => {
    return (
        <Padder horizontal>
            <Col>
                <Row>
                    <Col>
                        <Padder horizontal>
                            <Box borderRadius={10} fullWidth color={Colors.grey3} height={45}>
                                <Row>
                                    <Col size={3} justifyCenter>
                                        <Padder horizontal>
                                            <Circle size={30} color={Colors.purple1}>
                                                <ScaledText color={Colors.white}>
                                                    {props.data.verse_number}
                                                </ScaledText>
                                            </Circle>
                                        </Padder>
                                    </Col>
                                    <Col justifyCenter>
                                        <Row alignCenter justifyEnd>
                                            <ImgIcon
                                                source={require('../../assets/play.png')}
                                                tintColor={Colors.purple1}
                                                size={30}
                                            />
                                            <ImgIcon
                                                source={require('../../assets/share.png')}
                                                tintColor={Colors.purple1}
                                                size={25}
                                            />
                                            <Gap />
                                        </Row>
                                    </Col>
                                </Row>
                            </Box>
                        </Padder>
                    </Col>
                </Row>
                <Row justifyEnd>
                    <Padder all>
                        <ScaledText size={22}>{props.data.verse_arabic}</ScaledText>
                    </Padder>
                </Row>
                <Row>
                    <Padder horizontal>
                        <ScaledText size={14}>{props.data.verse_bahasa}</ScaledText>
                    </Padder>
                </Row>
                <Gap vertical />
                <Line />
                <Gap vertical />
            </Col>
        </Padder>
    );
};

export default DetailScreen;
