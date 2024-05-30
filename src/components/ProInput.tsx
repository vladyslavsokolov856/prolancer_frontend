import { InputLabel, OutlinedInput, OutlinedInputProps, Stack } from "@mui/material";
import React, { ReactNode } from "react";

type ProInputProps = {
    helperText?: ReactNode
} & OutlinedInputProps

const ProInput: React.FC<ProInputProps> = ({ label, required, helperText, ...inputProps }) => {
    return (
        <Stack>
            <InputLabel sx={{ my: 0.5 }}>{label} {required && <span style={{ color: 'red' }}>*</span>}</InputLabel>
            <OutlinedInput size="small" {...inputProps} />
            {inputProps.error ? helperText : null}
        </Stack>
    )
};

export default ProInput