import { AntDesign, Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '../context/authContext';
import { blurhash } from '../utils/common';
import CustomMenuItems from './CustomMenuItems';

const ios = Platform.OS === 'ios';

const HomeHeader = () => {
  const { user, logout } = useAuth();
  const { top } = useSafeAreaInsets();

  const handleProfile = async () => {
    
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View
      style={{ paddingTop: ios ? top : top + 10 }}
      className="flex-row justify-between items-center px-5 bg-indigo-400 pb-6 rounded-b-3xl shadow"
    >
      <View>
        <Text
          style={{ fontSize: hp(3) }}
          className="font-medium text-white"
        >
          Mesajlar
        </Text>
      </View>

      <Menu>
        <MenuTrigger>
          <Image
            style={{
              height: hp(4.3),
              width: hp(4.3),
              borderRadius: hp(2.15),
              overflow: 'hidden',
            }}
            source={user?.profileUrl ? { uri: user.profileUrl } : null}
            placeholder={{ blurhash }}
            transition={500}
          />
        </MenuTrigger>

        <MenuOptions
          customStyles={{
            optionsContainer: {
              borderRadius: 10,
              marginTop: 40,
              marginLeft: -30,
              backgroundColor: 'white',
              shadowOpacity: 0.2,
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 8,
              elevation: 5,
              width: 160,
              paddingVertical: 4,
            },
          }}
        >
          <CustomMenuItems
            text="Profil"
            action={handleProfile}
            value={null}
            icon={
              <Feather
                name="user"
                size={hp(2.5)}
                color="#737373"
              />
            }
          />

          <Divider />

          <CustomMenuItems
            text="Çıkış Yap"
            action={handleLogout}
            value={null}
            icon={
              <AntDesign
                name="logout"
                size={hp(2.5)}
                color="#737373"
              />
            }
          />
        </MenuOptions>
      </Menu>
    </View>
  );
};

const Divider = () => {
  return (
    <View
      style={{
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#d4d4d4',
        marginVertical: 4,
        width: '100%',
      }}
    />
  );
};

export default HomeHeader;

const styles = StyleSheet.create({});