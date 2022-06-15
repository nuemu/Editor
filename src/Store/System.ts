import { createRoot } from "solid-js";
import { createStore } from "solid-js/store";

type actions = {
  [key: string]: any
}

const getterMethods = (key: string, store: any) => {
  const getFocus = () => {
    return store.focus
  };

  const getters: actions = {
    focus: getFocus
  }

  return getters[key]
}

const mutationMethods = (key: string, setStore: any) => {
  const patchFocus = (focus: number) => {
    setStore(
      'focus',
      focus
    );
  };

  const mutations: actions = {
    patch: patchFocus
  };

  return mutations[key]
}

const systemStore = () => {
  const [store, setStore] = createStore({
    focus: 0
  });

  const getters = (key: string) => {
    return getterMethods(key, store)
  }

  const mutations = (key: string) => {
    return mutationMethods(key, setStore)
  }

  return {getters, mutations}
}

export default createRoot(systemStore)
