import { StatusBar } from "expo-status-bar";
import { getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ChatList from "../../components/ChatList";
import { useAuth } from "../../context/authContext";
import { usersRef } from "../../firebaseConfig";

const home = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      getUsers();
    }
  }, [user?.uid]);

  const getUsers = async () => {
    const q = query(usersRef, where("userId", "!=", user?.uid));

    const queryShnapshot = await getDocs(q);
    let data = [];
    queryShnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });

    setUsers(data);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      {users.length > 0 ? (
        <ChatList currentUser={user} users={users} />
      ) : (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

export default home;

const styles = StyleSheet.create({});
