import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

export default function Select(props) {
  const { name, label, value, error = null, onChange, options } = props;

  return (
    <FormControl variant="outlined" {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
        <MenuItem value="">None</MenuItem>
        {options &&
          options.map((item) => (
            <MenuItem
              key={item.id}
              value={item.chequeNo ? item.chequeNo : item.id}
            >
              {item.title && item.title}{" "}
              {item.firstName && item.firstName + " " + item.lastName}{" "}
              {item.siteName && item.siteName}
              {item.chequeNo && item.chequeNo}
            </MenuItem>
          ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
