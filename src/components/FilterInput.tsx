import React, { useEffect, useState } from "react";
import InputBase from "@mui/material/InputBase";
import styles from "../../styles/Input.module.css";
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';


interface FilterInputProps {
    type: string
    id: string
    placeholder: string
    size: number
    length: number
    pattern: string
    onInputUpdate: (Value: string) => void
}

export const FilterInput: React.FC<FilterInputProps> = ({ type, id, placeholder, size, length, pattern, onInputUpdate }) => {

    const [searchValue, setSearchValue] = useState({text: ''});

    useEffect(() => {
        onInputUpdate(searchValue.text);
    }, [searchValue])

    const customInputProps = {
        maxLength: length,
        className: styles.inputBorder,
        ...(pattern != "" && { pattern: pattern }),
        ...(type == "checkbox" && { type: type }),
    };
      


return (
    <InputBase
        sx={{
            ml: 1, 
            flex: 1, 
            width: size
        }}
        id={id}
        inputProps={customInputProps}
        placeholder={placeholder}
        onChange={(e) => {
            if (type == "number"){
                e.target.value=e.target.value.replace(/\D/g, '');
            }
            setSearchValue({text: e.target.value});
        }}
    />
)
}