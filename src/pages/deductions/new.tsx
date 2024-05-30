import DeductionForm from "@/components/Form/DeductionForm";
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

            <DeductionForm />
        </Box>
    )
};

export default CreateDeduction