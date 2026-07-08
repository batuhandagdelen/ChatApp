import { ActivityIndicator, View } from 'react-native'

const Loading = ({
  size = 60,
  color = '#6366f1',
  backgroundColor = 'transparent',
}) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator size="large" color={color} />
    </View>
  )
}

export default Loading