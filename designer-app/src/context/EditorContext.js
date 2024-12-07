import { createContext, useState } from "react";

export const EditorContext = createContext({
  /** @type {UseState<number>} */
  updatedState: null,
});

const EditorContextProvider = (props) => {
  const updatedState = useState(Date.now());

  return (
    <EditorContext.Provider value={{ updatedState }}>
      {props.children}
    </EditorContext.Provider>
  );
};

export default EditorContextProvider;
