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
    patchFocus: patchFocus
  };

  return mutations[key]
}

const systemStore = () => {
  const [store, setStore] = createStore({
    focus: "none"
  });

  const system_getters = (key: string) => {
    return getterMethods(key, store)
  }

  const system_mutations = (key: string) => {
    return mutationMethods(key, setStore)
  }

  return {system_getters, system_mutations}
}

export default createRoot(systemStore)
