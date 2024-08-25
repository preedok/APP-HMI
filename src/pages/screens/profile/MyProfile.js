
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Image
} from 'react-native';
import { Card, Button, Avatar, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logout } from '../../../../store/reducers/authSlice';
import { reset } from '../../../../store/reducers/userSlice';
// import FingerprintScanner from 'react-native-fingerprint-scanner';
import DropDownPicker from 'react-native-dropdown-picker';
const Profile = () => {
  let fullName, photo, phoneNumber;
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector(state => state?.auth);
  const user = useSelector(state => state?.user);
  useEffect(() => {
    if (auth?.token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [auth?.token]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    dispatch(logout());
    dispatch(reset());
  };
  const [expanded, setExpanded] = React.useState(false);
  const handlePress = () => setExpanded(!expanded);


  // login finger print
  // const [errorMessage, setErrorMessage] = useState('');
  // const handleFingerprintAuth = async () => {
  //   try {
  //     const result = await FingerprintScanner.authenticate({
  //       title: 'Login with Fingerprint',
  //       subTitle: 'Place your fingerprint on the sensor',
  //       description: 'Touch the fingerprint sensor',
  //       cancelButton: 'Cancel', // Optional
  //     });

  //     if (result.success) {
  //       // Authentication successful, navigate to the home screen or perform login logic
  //       setErrorMessage('');
  //       // Your logic here
  //     } else {
  //       // Authentication failed
  //       setErrorMessage('Authentication failed');
  //     }
  //   } catch (error) {
  //     // Handle errors (e.g., device does not support fingerprint, etc.)
  //     setErrorMessage('Segera Hadir Login Fitur Finger Print');
  //   }
  // };

  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };

  const handleNavigate = () => {
    if (selectedRole === 'login') {
      // Navigasi ke halaman Login
    } else if (selectedRole === 'register') {
      // Navigasi ke halaman Register
    }
  };


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#e9f6ea" />
      {isLoggedIn ? (
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -67, marginBottom: 10 }}>
            <Image
              source={require('../../../assets/hmi.png')}
              style={{ width: 16, height: 40, marginRight: 8, marginBottom: 5 }}
            />
            <View>
              <Text style={{ fontSize: 15, fontWeight: 600 }}>Himpunan Mahasiswa Islam</Text>
              <Text style={{ fontSize: 11, fontWeight: 600, marginBottom: 10, fontStyle: 'italic' }}>Islamic Student Association</Text>
            </View>
          </View>
          <View style={styles.profileContainer}>
            <Avatar.Image
              size={150}
              icon="account-outline"
              source={
                user && user.data && user.data.photo
                  ? { uri: user.data.photo }
                  : user && user.data && user.data[0] && user.data[0].photo
                    ? { uri: user.data[0].photo }
                    : require('../../../assets/profile.jpg')
              }
              defaultSource={require('../../../assets/profile.jpg')}
              style={styles.avatar}
            />

            <Text style={styles.title}>
              {user && user.data && user.data.fullName
                ? user.data.fullName
                : user && user.data && user.data[0] && user.data[0].fullName
                  ? user.data[0].fullName
                  : 'No Name'}
            </Text>
            <Text style={styles.title1}>
              HMI Cabang Padang
            </Text>
            <Button
              style={styles.btnLogout}
              mode="contained"
              labelStyle={styles.btnText}
              onPress={handleLogout}>
              Logout
            </Button>
          </View>

          <Card.Content style={styles.cardContent}>
            <List.Section>
              <TouchableOpacity>
                <List.Accordion
                  title="Edit Profile"
                  titleStyle={{ color: 'green' }}
                  left={() => (
                    <List.Icon icon="account-edit-outline" color="green" />
                  )}
                  right={() =>
                    expanded ? null : (
                      <List.Icon icon="chevron-down" color="green" />
                    )
                  }
                  expanded={expanded}
                  onPress={handlePress}>
                  <List.Item
                    title="Edit Gambar"
                    titleStyle={{ color: 'green' }}
                    left={() => (
                      <List.Icon
                        icon="account-box-outline"
                        style={{ marginLeft: 20 }}
                        color="green"
                      />
                    )}
                    right={() => (
                      <List.Icon
                        icon="chevron-right"
                        style={{ marginLeft: 20 }}
                        color="green"
                      />
                    )}
                    onPress={() => navigation.navigate('EditPicture')}
                  />
                  <List.Item
                    title="Edit Informasi"
                    titleStyle={{ color: 'green' }}
                    left={() => (
                      <List.Icon
                        icon="account-cog-outline"
                        style={{ marginLeft: 20 }}
                        color="green"
                      />
                    )}
                    right={() => (
                      <List.Icon icon="chevron-right" color="green" />
                    )}
                    onPress={() => navigation.navigate('EditInfo')}
                  />
                </List.Accordion>
                <List.Item
                  title="Kartu Anggota"
                  titleStyle={{ color: 'green' }}
                  left={() => (
                    <List.Icon icon="account-box-outline" color="green" />
                  )}
                  right={() => (
                    <List.Icon icon="chevron-right" color="green" />
                  )}
                  onPress={() => navigation.navigate('CardUser')}
                />
              </TouchableOpacity>
            </List.Section>
          </Card.Content>
        </View>
      ) : (
        <Card>
          <Card.Content style={styles.cardContent}>
            <Text style={styles.text}>Anda Belum Login !</Text>

            <View style={styles.avatarContainer}>
              <Text style={styles.logins}>Klik Icon Untuk Login dengan Sidik Jari</Text>
              <TouchableOpacity >
                <Avatar.Image
                  size={150}
                  icon="account-outline"
                  source={require('../../../assets/fingerpng.png')}
                  style={styles.avatar}
                />
              </TouchableOpacity>
              {/* {errorMessage !== '' && <Text>{errorMessage}</Text>} */}
            </View>
            <DropDownPicker
              items={[
                { label: 'Pilih peran', value: '' },
                { label: 'PB HMI', value: 'pbhmi' },
                { label: 'BPL HMI', value: 'bplhmi' },
                { label: 'BADKO HMI', value: 'badbkohmi' },
                { label: 'BPL BADKO HMI', value: 'bplbadkohmi' },
                { label: 'Cabang HMI', value: 'cabanghmi' },
                { label: 'BPL Cabang HMI', value: 'bplhmi' },
                { label: 'Komisariat HMI', value: 'komisariathmi' },
                { label: 'Lembaga HMI', value: 'lembagahmi' },
                { label: 'Kohati HMI', value: 'kohatihmi' },
              ]}
              placeholder="Login Sebagai"
              containerStyle={styles.pickerContainer}
              style={styles.pickerStyle}
              dropDownStyle={styles.dropDownStyle}
              onChangeItem={(item) => handleRoleChange(item.value)}
            />
            {selectedRole ? (
              <TouchableOpacity onPress={handleNavigate}>
                <View style={styles.button}>
                  <Text style={{ color: 'white' }}>Login Sebagai</Text>
                </View>
              </TouchableOpacity>
            ) : null}
            <Text style={styles.text2}>Atau</Text>
            <TouchableOpacity>
              <DropDownPicker
                items={[
                  { label: 'Pilih peran', value: '' },
                  { label: 'PB HMI', value: 'pbhmi' },
                  { label: 'BPL HMI', value: 'bplhmi' },
                  { label: 'BADKO HMI', value: 'badbkohmi' },
                  { label: 'BPL BADKO HMI', value: 'bplbadkohmi' },
                  { label: 'Cabang HMI', value: 'cabanghmi' },
                  { label: 'BPL Cabang HMI', value: 'bplhmi' },
                  { label: 'Komisariat HMI', value: 'komisariathmi' },
                  { label: 'Lembaga HMI', value: 'lembagahmi' },
                  { label: 'Kohati HMI', value: 'kohatihmi' },
                ]}
                placeholder="Daftar Sebagai"
                containerStyle={styles.pickerContainer}
                style={styles.pickerStyle}
                dropDownStyle={styles.dropDownStyle}
                onChangeItem={(item) => handleRoleChange(item.value)}
              />
              {selectedRole ? (
                <TouchableOpacity onPress={handleNavigate}>
                  <View style={styles.button}>
                    <Text style={{ color: 'white' }}>Daftar Sebagai</Text>
                  </View>
                </TouchableOpacity>
              ) : null}
            </TouchableOpacity>
          </Card.Content>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9f6ea',
    paddingTop: StatusBar.currentHeight + 80,
    padding: 10,
  },
  pickerContainer: {
    height: 40,
    width: 360,
  },
  pickerStyle: {
    borderColor: 'green',
    backgroundColor: '#fff',
  },
  dropDownStyle: {
    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 10,
    elevation: 3,
  },
  avatarContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  avatar: {
    justifyContent: 'center',
    backgroundColor: '#7abec1',
    marginBottom: 10,
    marginTop: 20
  },
  title: {
    fontSize: 30,
    marginBottom: 2,
    color: 'black',
  },
  title1: {
    fontSize: 19,
    marginBottom: 10,
    color: 'black',
  },
  btnLogout: {
    position: 'absolute',
    top: 5,
    right: 0,
    marginBottom: 10,
    backgroundColor: 'transparent',
    borderRadius: 10,
    width: 100,
  },
  btnText: {
    fontSize: 15,
    color: 'red',
  },
  card: {
    backgroundColor: 'transparent',
  },
  cardContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 3,
  },
  button: {
    backgroundColor: 'green',
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
  },
  label: {
    fontSize: 20,
  },
  textcontainer: {
    position: 'absolute',
    top: 180,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: 24,
    marginTop: 20,
  },
  text2: {
    color: 'black',
    textAlign: 'center',
    fontSize: 24,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Profile;
