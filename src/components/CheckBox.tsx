import React, { useEffect, useState } from "react";
import InputBase from "@mui/material/InputBase";

interface FilterCheckboxProps {
    id: string
    onInputUpdate: (Value: boolean) => void
}

export const CheckBox: React.FC<FilterCheckboxProps> = ({ id, onInputUpdate }) => {

    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        onInputUpdate(isChecked);
    }, [isChecked])

//    
return (
    <InputBase
        sx={{
            width: 100
        }}
        type="checkbox"
        id={id}
        defaultChecked={isChecked}
        onChange={(e) => {
            setIsChecked(!isChecked);
        }}
    />
)
}