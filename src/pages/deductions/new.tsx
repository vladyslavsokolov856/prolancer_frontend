import ProInput from "@/components/ProInput";
import ProSelect from "@/components/ProSelect";
import { Box, styled } from "@mui/material";

const Title = styled('span')({
    fontWeight: 700,
    fontSize: '2rem',
    color: 'rgb(108, 117, 125)',
})

const CreateDeduction = () => {
    return (
        <Box display="flex" justifyContent="left" flexDirection="column">
            <Title>Create invoice</Title>

            <ProInput label="Description" />
            <ProSelect label="Task" />
        </Box>
    )
};

export default CreateDeduction