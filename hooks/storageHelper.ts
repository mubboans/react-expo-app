import AsyncStorage from '@react-native-async-storage/async-storage';

// Define a generic type for storing and retrieving different types of data
type StorageKey = string;

class StorageHelper {
  // Store data with a key (value can be of any type, we'll convert it to a string for storage)
  static async storeData<T>(key: StorageKey, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      console.log(`Data stored with key: ${key}`);
    } catch (error) {
      console.error('Failed to store data in AsyncStorage', error);
    }
  }

  // Retrieve data for a given key, and parse it into the expected type
  static async getData<T>(key: StorageKey): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
    } catch (error) {
      console.error('Failed to retrieve data from AsyncStorage', error);
      return null;
    }
  }

  // Remove data for a given key
  static async removeData(key: StorageKey): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Data removed with key: ${key}`);
    } catch (error) {
      console.error('Failed to remove data from AsyncStorage', error);
    }
  }

  // Clear all AsyncStorage
  static async clearStorage(): Promise<void> {
    try {
      await AsyncStorage.clear();
      console.log('All data cleared from AsyncStorage');
    } catch (error) {
      console.error('Failed to clear AsyncStorage', error);
    }
  }

  // Retrieve all keys in AsyncStorage
}

export default StorageHelper;
