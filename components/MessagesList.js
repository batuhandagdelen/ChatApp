import { ScrollView, StyleSheet } from 'react-native'
import MessageItem from './MessageItem'

const MessagesList = ({messages, scrollViewRef, currentUser}) => {
  return (
    <ScrollView
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingTop: 10}}
    >
      {
        messages.map((message, index)=>{
          return (
            <MessageItem  message={message} key={index} currentUser={currentUser} />
          )
        })
      }
    </ScrollView>
  )
}

export default MessagesList

const styles = StyleSheet.create({})