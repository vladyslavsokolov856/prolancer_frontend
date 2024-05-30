import { InputLabel, Select, SelectProps, Stack } from "@mui/material";
import React, { ReactNode } from "react";

type ProSelectProps = {
    helperText?: ReactNode
} & SelectProps

const ProSelect: React.FC<ProSelectProps> = ({ label, required, helperText, sx, ...selectProps }) => {
    return (
        <Stack marginY={1} sx={sx}>
            <InputLabel sx={{ my: 0.5 }}>{label} {required && <span style={{ color: 'red' }}>*</span>}</InputLabel>
            <Select {...selectProps} size="small">
                {selectProps.children}
            </Select>
            {selectProps.error ? helperText : null}
        </Stack>
    )
};

export default ProSelect