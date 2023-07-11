import React from "react";
import Select from "react-select";
import { languageOption } from "../configs";
// import { customStyles } from "../constants/customStyles";
const LanguagesDropdown = ({ onSelectChange }) => {
  return (
    <Select
      placeholder={`Filter By Category`}
      options={languageOption}
      defaultValue={languageOption[0]}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
    />
  );
};

export default LanguagesDropdown;
