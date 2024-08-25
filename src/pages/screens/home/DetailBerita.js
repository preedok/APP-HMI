

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    TextInput,
    Alert,
    Linking,
    Image
} from 'react-native';
import {
    Card,
    List,
    Avatar,
    Checkbox,
    Button,
    Portal,
    Modal,
    IconButton,
} from 'react-native-paper';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { Rating } from 'react-native-ratings';
const Detail = ({ route }) => {
    const { itemData } = route.params;
    const navigation = useNavigation();
    const [index, setIndex] = useState(0);
    const [liked, setLiked] = useState(false);
    const [liked_by, setLiked_by] = useState([]);
    const user = useSelector(state => state?.user);
    const auth = useSelector(state => state?.auth);
    const [loading, setLoading] = useState(true);
    const likedBy = liked_by[0] ? liked_by[0].liked_by : null;

    useEffect(() => {
        const like = async () => {
            try {
                const response = await axios.get(
                    `https://odd-plum-cougar-cuff.cyclic.app/getlikes?recipe_id=${itemData.id}`,
                    {},
                );
                if (!response.data.data || response.data.data.length === 0) {
                    setLiked(false);
                } else {
                    setLiked_by(response.data.data);
                    const userId = user.data.id;
                    const isUserIdIncluded = response.data.data.some(
                        user_id => user_id.user_id === userId,
                    );
                    setLiked(isUserIdIncluded);
                }
            } catch (error) {
                console.log(error);
                setLiked(false);
            }
        };
        like();
    }, [itemData.id, user.data.id]);

    const [routes] = useState([
        { key: 'first', title: 'Informasi' },
        { key: 'second', title: 'Lokasi' },
        { key: 'third', title: 'Ulasan' },
    ]);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" barStyle="light-content" />
            <Card>
                {/* <ImageBackground style={styles.bg} source={{ uri: itemData.photo }} /> */}
                <ImageBackground style={styles.bg} source={require('../../../assets/gruplogo.jpg')} />
                <View style={styles.overlay} />
                {/* <Text style={styles.title}>{itemData.tittle}</Text> */}
                <Text style={styles.title}>Test Berita</Text>
                <Text style={styles.title1}>HMI Komisariat UPI</Text>
                <Text style={styles.title2}>22 Oktober 2023 - 29 Oktober 2023</Text>
                <View style={styles.iconBack}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <IconButton
                                icon="keyboard-backspace"
                                iconColor="white"
                                size={32}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 10,
                            marginBottom: 10,
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            padding: 7,
                            borderRadius: 10,
                        }}>
                            <Image
                                source={require('../../../assets/hmi.png')}
                                style={{ width: 16, height: 40, marginRight: 8, marginBottom: 5 }}
                            />
                            <View>
                                <Text style={{ fontSize: 15, fontWeight: '600' }}>Himpunan Mahasiswa Islam</Text>
                                <Text style={{ fontSize: 11, fontWeight: '600', marginBottom: 10, fontStyle: 'italic' }}>Islamic Student Association</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <Card.Content style={styles.cardContent}>
                    <Text style={{padding: 10}}>
                        Cooming Soon...
                    </Text>
                </Card.Content>
            </Card>
        </View>
    );
};

const FirstRoute = ({ itemData }) => {
    return (
        <View style={[styles.scene]}>
            {itemData &&
                itemData.ingredients &&
                Array.isArray(itemData.ingredients.split(',')) &&
                itemData.ingredients.split(',').map((ingredient, index) => (
                    <View style={styles.listItemContainer} key={index}>
                        <List.Item
                            style={styles.list}
                            title={`${index + 1}. ${ingredient.trim()}`}
                        />
                    </View>
                ))}
        </View>
    );
};

const SecondRoute = () => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity>
                <Image
                    source={require('../../../assets/map.jpg')}
                    style={{ width: 400, height: 300, borderRadius: 30 }}
                />
            </TouchableOpacity>
            <Text>
                Klik Gambar Map
            </Text>
        </View>
    );
};

const ThirdRoute = ({ itemData }) => {
    const auth = useSelector(state => state?.auth);
    const user = useSelector(state => state?.user);
    const [comments, setComments] = useState([]);
    const id = itemData.id;
    const [selectedScore, setSelectedScore] = useState(null);
    const reviewRef = useRef('');
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isComment, setIsComment] = useState(false);
    const isFocused = useIsFocused();
    const handleOnChangeRev = text => {
        reviewRef.current = text;
    };
    const handleScoreSelection = score => {
        setSelectedScore(score);
    };
    useEffect(() => {
        if (isFocused) {
            axios
                .get(`https://odd-plum-cougar-cuff.cyclic.app/comment?recipe_id=${id}`, {})
                .then(response => {
                    if (JSON.stringify(response.data.data) !== JSON.stringify(comments)) {
                        setComments(response.data.data);
                    }
                    const commentBy = response.data.data.map(comment =>
                        comment.comment_by ? comment.comment_by.toString() : '',
                    );
                    const isIdIncluded = commentBy.includes(user?.data?.id?.toString());
                    if (isIdIncluded !== isComment) {
                        setIsComment(isIdIncluded);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [id, isFocused, user?.data?.id, comments, isComment]);

    const submitReview = () => {
        if (!auth.token) {
            setShowLoginModal(true);
            return;
        }
        if (isComment) {
            Alert.alert('You have already commented on this recipe.');
            return;
        }
        const token = auth.token;
        axios
            .post(
                `https://odd-plum-cougar-cuff.cyclic.app/post_comment`,
                {
                    recipe_id: id,
                    score: selectedScore,
                    comment: reviewRef.current,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                },
            )
            .then(response => {
                setComments([...comments, response?.data?.data]);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <View style={styles.scene}>
            <ScrollView>
                <Card>
                    <Text style={styles.textReview}>
                        Apa pendapat anda tentang info ini?
                    </Text>
                    <Text style={styles.textReviewItem}>Berikan Skor</Text>
                    <View style={styles.checkboxContainer}>
                        {[1, 2, 3, 4, 5].map(score => (
                            <Checkbox.Item
                                key={score}
                                label={score.toString()}
                                style={styles.checkbox}
                                status={selectedScore === score ? 'checked' : 'unchecked'}
                                onPress={() => handleScoreSelection(score)}
                            />
                        ))}
                    </View>
                    <Text style={styles.textReviewItem}>Tambahkan Ulasan Anda:</Text>
                    <TextInput
                        editable
                        multiline
                        numberOfLines={4}
                        maxLength={500}
                        onChangeText={handleOnChangeRev}
                        defaultValue={reviewRef.current}
                        style={styles.textInput}
                        placeholder="Tuliskan Ulasan Anda Sekarang..."
                        placeholderTextColor="black"
                    />
                    <Button
                        mode="elevated"
                        style={styles.btnReview}
                        onPress={() => submitReview()}>
                        <Text style={styles.btnTextReview}>Kirim</Text>
                    </Button>
                </Card>
                <View style={styles.reviewItem}>
                    {comments.length === 0 ? (
                        <Text>Tidak Ada Komentar</Text>
                    ) : (
                        comments.map((comment, index) => (
                            <View
                                key={`${comment.id}-${index}`}
                                style={styles.commentContainer}>
                                {comment?.photo_user && (
                                    <Avatar.Image
                                        size={60}
                                        source={{ uri: comment.photo_user }}
                                        style={styles.avatar}
                                    />
                                )}
                                <View style={styles.commentContent}>
                                    <Text style={styles.name}>{comment.name_user}</Text>
                                    <View style={styles.ratingContainer}>
                                        <Rating
                                            type="star"
                                            ratingCount={5}
                                            startingValue={comment.score}
                                            imageSize={20}
                                            readonly
                                            ratingColor="gold"
                                            ratingBackgroundColor="gray"
                                        />
                                    </View>
                                    <Text style={styles.comment}>{comment.comment}</Text>
                                </View>
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>
            <Portal>
                <Modal
                    visible={showLoginModal}
                    onDismiss={() => setShowLoginModal(false)}
                    contentContainerStyle={styles.modalContainer}>
                    <Text style={styles.modalText}>Silakan masuk untuk menambahkan ulasan.</Text>
                    <Button onPress={() => setShowLoginModal(false)}>Keluar</Button>
                </Modal>
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: 'white',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    scene: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 30,
    },
    bg: {
        height: 280,
        resizeMode: 'cover',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        width: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    cardContent: {
        position: 'absolute',
        backgroundColor: 'white',
        height: 525,
        width: '100%',
        marginTop: 240,
        borderRadius: 20,
    },
    tabIndicator: {
        backgroundColor: '#7abec1',
        height: 5,
    },
    tabBar: {
        backgroundColor: 'white',
    },
    list: {
        color: 'black',
        marginLeft: -13,
        marginTop: -30,
    },
    listItemDescription: {
        fontSize: 18,
    },
    listItemContainer: {
        flexDirection: 'column',
    },
    listItemNumber: {
        marginRight: 8,
        fontSize: 16,
    },
    icon: {
        backgroundColor: '#7abec1',
        borderRadius: 8,
    },
    title: {
        position: 'absolute',
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 110,
        width: '75%',
        textTransform: 'capitalize',
    },
    title2: {
        position: 'absolute',
        color: 'white',
        fontSize: 11,
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginLeft: 20,
        marginTop: 210,
        width: '75%',
        textTransform: 'capitalize',
    },
    title1: {
        position: 'absolute',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 186,
        width: '75%',
        textTransform: 'capitalize',
    },
    subtitle: {
        position: 'absolute',
        color: 'white',
        fontSize: 15,
        marginLeft: 20,
        marginTop: 210,
    },
    iconBack: {
        position: 'absolute',
        width: '95%',
        top: 30,
        left: 5,
        zIndex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    commentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        marginRight: 10,
    },
    commentContent: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'black',
    },
    score: {
        fontSize: 14,
        marginBottom: 5,
        color: 'black',
    },
    comment: {
        fontSize: 14,
        color: 'black',
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    checkbox: {
        margin: -5,
    },
    textInput: {
        backgroundColor: '#eaebe8',
        height: 80,
        width: '94%',
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 10,
        color: 'black',
    },
    btnReview: {
        backgroundColor: 'green',
        borderRadius: 10,
        margin: 10,
    },
    btnTextReview: {
        color: 'white',
        fontSize: 14,
    },
    textReview: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10,
        color: 'black',
    },
    textReviewItem: {
        fontSize: 14,
        marginLeft: 10,
        color: 'black',
    },
    reviewItem: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
        color: 'black',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 5,
    },
    // btnLike: {
    //   alignSelf: 'center',
    // },
});

export default Detail;
