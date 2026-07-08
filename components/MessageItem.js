import { StyleSheet, Text, View } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

const MessageItem = ({ message, currentUser }) => {
  const isMyMessage = currentUser?.userId == message?.userId

  return (
    <View
      style={[
        styles.messageRow,
        isMyMessage ? styles.myMessageRow : styles.otherMessageRow,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          isMyMessage ? styles.myMessageBubble : styles.otherMessageBubble,
        ]}
      >
        <Text style={styles.messageText}>
          {message?.text}
        </Text>
      </View>
    </View>
  )
}

export default MessageItem

const styles = StyleSheet.create({
  messageRow: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 12,
  },

  myMessageRow: {
    justifyContent: 'flex-end',
  },

  otherMessageRow: {
    justifyContent: 'flex-start',
  },

  messageBubble: {
    maxWidth: wp(75),
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
  },

  myMessageBubble: {
    backgroundColor: '#DCF8C6',
    borderColor: '#BDE5A8',
    borderBottomRightRadius: 4,
  },

  otherMessageBubble: {
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
    borderBottomLeftRadius: 4,
  },

  messageText: {
    fontSize: hp(1.9),
    color: '#111827',
    lineHeight: hp(2.5),
  },
})