import { createRoot } from "solid-js";
import { createStore } from "solid-js/store";

type actions = {
  [key: string]: any
}

const getterMethods = (key: string, store: any) => {
  const getFocus = () => {
    return store.focus
  };

  const getCaret = () => {
    return store.caret
  }

  const getters: actions = {
    focus: getFocus,
    caret: getCaret
  }

  return getters[key]
}

const mutationMethods = (key: string, setStore: any) => {
  const setFocus = (focus: number) => {
    setStore(
      'focus',
      focus
    );
  };

  const setCaret = (caret: number) => {
    setStore(
      'caret',
      caret
    )
  }

  const mutations: actions = {
    setFocus: setFocus,
    setCaret: setCaret
  };

  return mutations[key]
}

const systemStore = () => {
  const [store, setStore] = createStore({
    focus: "none",
    caret: 0,
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
