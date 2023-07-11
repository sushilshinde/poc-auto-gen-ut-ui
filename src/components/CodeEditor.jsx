import React, { useState } from "react";

import Editor from "@monaco-editor/react";
import LanguagesDropdown from "./LanguageDropDown";
import { languageOption } from "../configs";

const CodeEditor = ({ onChange, code, theme, onValidate }) => {
  const [editorLanguage, setEditorLanguage] = useState(languageOption[0])

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
        <LanguagesDropdown onSelectChange={(data) => setEditorLanguage(data)}/>
      <Editor
      height={'86.5vh'}
        language={editorLanguage?.value || "javascript"}
        value={code}
        theme={theme.value}
        defaultValue="// Write some code here...."
        onChange={onChange}
        onValidate={onValidate}
      />
    </div>
  );
};
export default CodeEditor;