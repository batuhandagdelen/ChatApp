import { Feather, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import CustomKeyboardView from "../components/CustomKeyboardView";
import Loading from "../components/Loading";
import { useAuth } from "../context/authContext";

const signUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const emailRef = useRef("");
  const profileRef = useRef("");

  const { register } = useAuth();

  const handleRegister = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !usernameRef.current ||
      !profileRef.current
    ) {
      Alert.alert("kayit", "tum alanlar zorunludur");
      return;
    }
    setLoading(true);
    let response = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current,
      profileRef.current,
    );
    setLoading(false);

    if (!response?.success) {
      Alert.alert("kayit", response.msg);
    }
  };

  return (
    <CustomKeyboardView>
      <View className="flex-1 bg-white">
        <StatusBar style="dark" />

        <View
          style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }}
          className="flex-1 gap-5"
        >
          {/* kayit ol resmi */}
          <View className="items-center">
            <Image
              style={{ height: hp(20), width: wp(90) }}
              resizeMode="contain"
              source={require("../assets/images/register.jpg")}
            />
          </View>

          {/*veri alanlari */}
          <View className="items-center">
            <Text
              style={{ fontSize: hp(4) }}
              className="font-bold tracking-wider text-center text-neutral-800"
            >
              Kayit Ol
            </Text>

            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl mt-5 ml-0"
            >
              <Feather name="user" size={hp(2.7)} color="gray" />

              <TextInput
                onChangeText={(value) => (usernameRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Kullanici adi"
                placeholderTextColor="gray"
              />
            </View>

            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl mt-10 ml-0"
            >
              <Octicons name="mail" size={hp(2.7)} color="gray" />

              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Email adresi"
                placeholderTextColor="gray"
              />
            </View>

            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl mt-10 ml-0"
            >
              <Octicons name="lock" size={hp(2.7)} color="gray" />

              <TextInput
                onChangeText={(value) => (passwordRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Sifre"
                placeholderTextColor="gray"
                secureTextEntry
              />
            </View>

            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl mt-10 ml-0"
            >
              <Feather name="image" size={hp(2.7)} color="gray" />

              <TextInput
                onChangeText={(value) => (profileRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Profil Url"
                placeholderTextColor="gray"
              />
            </View>
          </View>

          <View>
            {loading ? (
              <View className="flex-row justify-center">
                <Loading size={hp(8)} />
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleRegister}
                style={{ height: hp(6.5) }}
                className="bg-indigo-500 rounded-xl justify-center items-center"
              >
                <Text
                  style={{ fontSize: hp(2.7) }}
                  className="text-white font-bold tracking-wider"
                >
                  Kayit Ol
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* zaten hesabin varsa */}
          <View className="flex-row justify-center">
            <Text
              style={{ fontSize: hp(1.8) }}
              className="font-semibold text-neutral-500"
            >
              Zaten bir hesabin var mi?
            </Text>
            <Pressable onPress={() => router.push("signIn")}>
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-bold text-indigo-500"
              >
                Giris Yap
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default signUp;

const styles = StyleSheet.create({});
