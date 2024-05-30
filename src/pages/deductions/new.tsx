import { Box, styled } from "@mui/material";

const Title = styled('span')({
    fontWeight: 700,
    fontSize: '2.25rem',
    color: 'rgb(108, 117, 125)',
})

const CreateDeduction = () => {
    return (
        <Box display="flex" justifyContent="left" flexDirection="column">
            <Title>Create invoice</Title>
        </Box>
    )
};

export default CreateDeduction