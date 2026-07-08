import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';

const ios = Platform.OS === 'ios';

const CustomKeyboardView = ({ children, isChat = false }) => {
  if (isChat) {
    return (
      <KeyboardAvoidingView
        behavior={ios ? 'padding' : 'height'}
        keyboardVerticalOffset={ios ? 90 : 0}
        style={{ flex: 1 }}
      >
        {children}
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={ios ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardView;

const styles = StyleSheet.create({});