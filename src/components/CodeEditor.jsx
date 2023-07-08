import React, { useState } from "react";

import Editor from "@monaco-editor/react";
import LanguagesDropdown from "./LanguageDropDown";

const languageOptions = [
    {
      id: 63,
      name: "JavaScript (Node.js 12.14.0)",
      label: "JavaScript (Node.js 12.14.0)",
      value: "javascript",
    },];

const CodeEditor = ({ onChange, code, theme, onValidate }) => {
  const [editorLanguage, setEditorLanguage] = useState(languageOptions[0])

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl col-span-5">
        <LanguagesDropdown onSelectChange={(data) => setEditorLanguage(data)}/>
      <Editor
      height={'50vh'}
        language={editorLanguage.value || "javascript"}
        value={code}
        theme={theme.value}
        defaultValue="// some comment"
        onChange={onChange}
        onValidate={onValidate}
      />
    </div>
  );
};
export default CodeEditor;