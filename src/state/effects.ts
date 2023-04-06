import { getStorage, setStorage } from "zmp-sdk";
import { AtomEffect } from "recoil";

export function nativeStorageEffect<T>(key: string) {
  return (({ setSelf, onSet, getPromise }) => {
    getStorage({
      keys: [key],
      success: (res) => {
        if (res[key]) {
          setSelf(res[key]);
        }
      },
      fail: console.error,
    });

    onSet((newValue, _, isReset) => {
      setStorage({
        data: {
          [key]: isReset ? undefined : newValue,
        },
        fail: console.error,
      });
    });
  }) as AtomEffect<T>;
}

export function localStorageEffect<T>(key: string) {
  return (({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue) {
      try {
        let savedData = JSON.parse(savedValue) as T;
        setSelf(savedData);
      } catch (error) {
        console.log("Failed to load cached data for key: " + key);
      }
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  }) as AtomEffect<T>;
}
