import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Keyboard, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Feather } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import CustomKeyboardView from '../../components/CustomKeyboardView';
import MessagesList from '../../components/MessagesList';
import { useAuth } from '../../context/authContext';

import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import { db } from "../../firebaseConfig";
import { getRoomId } from "../../utils/common";

const ChatRoom = () => {
  const item = useLocalSearchParams()
  const { user } = useAuth();
  const router = useRouter();

  const textRef = useRef()
  const inputRef = useRef()

  const [messages,setMessages] = useState([])

  const scrollViewRef = useRef(null)

  useEffect(()=>{
    if (!user?.userId || !item?.userId) return;
      createRoomIfNotExists()

      let roomId = getRoomId(user.userId, item.userId)
      const docRef = doc(db, "rooms", roomId)
      const messagesRef = collection(docRef,"messages")
      const q = query(messagesRef, orderBy("createdAt", "asc"))

    const unsub = onSnapshot(q,(snapshot) =>{
      let allMessages = snapshot.docs.map(doc=>{
        return{
          id: doc.id,
          ...doc.data()
        }
      })
      setMessages(allMessages)
    }, (error)=>{
      console.log("mesaj alimi hatasi ", error)
    })

    const KeyboardDidShowListerner = Keyboard.addListener(
      "keyboardDidShow", updateScrollView
    )

    return () => {
      unsub()
      KeyboardDidShowListerner.remove()
    }

  },[user?.userId, item?.userId])

  useEffect(()=>{
    updateScrollView()
  },[messages])

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({animated: true})
    });
  }

  const createRoomIfNotExists = async () => {
    let roomId = getRoomId(user?.userId, item?.userId)
    await setDoc(doc(db,"rooms",roomId),{
      roomId,
      createdAt: Timestamp.fromDate(new Date())
    })
  }

  const handleSendMessage = async () => {
    let message = textRef.current.trim()
    if (!message) return;
    try {
      let roomId = getRoomId(user?.userId, item?.userId)
      const docRef = doc(db,"rooms",roomId)
      const messageRef = collection(docRef,"messages")
      textRef.current = ""
      if(inputRef) inputRef?.current?.clear()

        const newDoc = await addDoc(messageRef,{
          userId: user?.userId,
          text: message,
          profileUrl: user?.profileUrl,
          senderName: user?.username,
          createdAt: Timestamp.fromDate(new Date())
        })
    } catch (error) {
      Alert.alert("Mesaj ", error.message)
    }
  }

  return (
    <CustomKeyboardView isChat={true}>
      <View className="flex-1 bg-white">
        <ChatRoomHeader user={user} router={router} />

        {/* Header alt çizgi */}
        <View className="h-[1px] bg-neutral-300" />

        <View className="flex-1 justify-between bg-neutral-100">
          <View className="flex-1">
            <MessagesList scrollViewRef={scrollViewRef} messages={messages} currentUser={user}/>
          </View>

          <View
            style={{ marginBottom: hp(2.7) }}
            className="pt-2"
          >
            <View className="flex-row mx-3 items-center bg-white border border-neutral-300 rounded-full px-5 py-2">
              <TextInput
                ref={inputRef}
                onChangeText={value => textRef.current = value}
                placeholder="buraya yaz.."
                placeholderTextColor="#9ca3af"
                style={{
                  fontSize: hp(2),
                  minHeight: hp(4.5),
                }}
                className="flex-1 mr-2 text-neutral-800"
              />
              <TouchableOpacity onPress={handleSendMessage} className="bg-neutral-200 p-2 mr-[1px] rounded-full">
                <Feather name='send' size={hp(2.7)} color="#737373" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({});