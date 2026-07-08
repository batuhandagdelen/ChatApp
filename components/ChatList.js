import { useRouter } from 'expo-router'
import { FlatList, StyleSheet, View } from 'react-native'
import ChatItem from './ChatItem'

const ChatList = ({users, currentUser}) => {

    const router = useRouter()

  return (
    <View className = "flex-1">
      <FlatList 
        data={users}
        contentContainerStyle={{flex: 1, paddingVertical: 25}}
        keyExtractor={(item)=>item.userId}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => <ChatItem
            noBorder={index + 1 == users.length}
            router={router}
            currentUser={currentUser}
            item={item}
            index={index}
         />}
      />
    </View>
  )
}

export default ChatList

const styles = StyleSheet.create({})