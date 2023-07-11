import React from "react";
import Select from "react-select";
import { themes } from "../configs";

const ThemeDropdown = ({ handleThemeChange, theme }) => {
	return (
		<Select
			className="theme-btn"
			placeholder={`Select Theme`}
			options={themes}
			value={theme}
			onChange={handleThemeChange}
		/>
	);
};

export default ThemeDropdown;