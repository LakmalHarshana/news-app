import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function ComboBox(props) {
  const {
    id,
    label,
    onChange,
    options,
    value,
    getOptionLabel,
    width = 190,
  } = props;

  return (
    <Autocomplete
      id={id}
      options={options}
      size="small"
      value={value}
      style={{ width }}
      onChange={onChange}
      openOnFocus={true}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
    />
  );
}
