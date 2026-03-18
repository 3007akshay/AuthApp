import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_KEY = 'user_session';
const SESSION_DURATION = 5 * 60 * 60 * 1000; // 5 hours

// ✅ Save session
export const saveSession = async (user: any) => {
  const session = {
    user,
    loginTime: Date.now()
  };

  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

// ✅ Get session
export const getSession = async () => {
  const data = await AsyncStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
};

// ✅ Check if session is valid
export const isSessionValid = (loginTime: number) => {
  const now = Date.now();
  return now - loginTime < SESSION_DURATION;
};

// ✅ Clear session
export const clearSession = async () => {
  await AsyncStorage.removeItem(SESSION_KEY);
};