import { Image } from "expo-image";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import { db } from "../firebaseConfig";
import { blurhash, formatDate, getRoomId } from "../utils/common";

const ChatItem = ({ item, router, noBorder, currentUser }) => {
  const [lastMessage, setLastMessage] = useState(undefined);

  const openChatRoom = () => {
    router.push({
      pathname: "/chatRoom",
      params: item,
    });
  };

  const renderTime = () => {
    if (!lastMessage?.createdAt?.seconds) return "";

    const date = lastMessage.createdAt;
    return formatDate(new Date(date.seconds * 1000));
  };

  const renderLastMessage = () => {
    if (lastMessage === undefined) return "Yükleniyor...";
    if (lastMessage === null) return "Merhaba de";

    if (currentUser?.userId === lastMessage?.userId) {
      return "Sen: " + lastMessage?.text;
    }

    return lastMessage?.text;
  };

  useEffect(() => {
    if (!currentUser?.userId || !item?.userId) return;

    const roomId = getRoomId(currentUser.userId, item.userId);

    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");

    const q = query(messageRef, orderBy("createdAt", "desc"), limit(1));

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          setLastMessage(null);
          return;
        }

        const lastMsg = snapshot.docs[0].data();

        setLastMessage({
          id: snapshot.docs[0].id,
          ...lastMsg,
        });
      },
      (error) => {
        console.log("mesaj aliminda hata ", error);
      },
    );

    return () => unsub();
  }, [currentUser?.userId, item?.userId]);

  return (
    <TouchableOpacity
      onPress={openChatRoom}
      style={{
        marginHorizontal: 10,
        borderBottomWidth: noBorder ? 0 : StyleSheet.hairlineWidth,
        borderBottomColor: "#d4d4d4",
      }}
      className="flex-row items-center gap-3"
    >
      <Image
        source={{ uri: item?.profileUrl }}
        style={{
          height: hp(6),
          width: hp(6),
          borderRadius: hp(3),
          overflow: "hidden",
          marginVertical: 5,
        }}
        placeholder={{ blurhash }}
      />

      {/* zaman ve son mesaj */}
      <View className="flex-1" style={{ marginLeft: 10 }}>
        <View
          className="flex-row justify-between items-center"
          style={{ marginBottom: 8 }}
        >
          <Text
            style={{ fontSize: hp(1.8) }}
            className="font-semibold text-neutral-800"
          >
            {item?.username}
          </Text>

          <Text
            style={{ fontSize: hp(1.6) }}
            className="font-medium text-neutral-500"
          >
            {renderTime()}
          </Text>
        </View>

        <Text
          style={{ fontSize: hp(1.6), lineHeight: hp(2.2) }}
          className="font-medium text-neutral-500"
          numberOfLines={1}
        >
          {renderLastMessage()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;

const styles = StyleSheet.create({});
