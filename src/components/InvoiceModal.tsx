import {
    Box,
    Button,
    Modal,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Typography,
  } from '@mui/material'
  import React from 'react'
  
  type InvoiceModalProps = {
    open: boolean
    steps: Array<string>
    activeStep: number
    handelClose: () => void
  }
  
  const modalStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
  
  const boxStyles = {
    width: '60%',
    maxWidth: 800,
    height: '60vh',
  }
  
  const paperStyles = {
    padding: '40px',
    margin: 'auto',
  }
  
  const titleStyles = {
    mb: 3,
    pb: 3,
    color: '#6c757d',
    fontWeight: 700,
    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'sans-serif',
  }
  
  const stepIconStyles = {
    '& .MuiStepIcon-root': {
      fontSize: '2rem',
      width: '3rem',
      height: '3rem',
    },
  }
  
  const descriptionStyles = {
    mb: 3,
    color: '#888f95',
    textAlign: 'center',
  }
  
  const buttonContainerStyles = {
    display: 'flex',
    justifyContent: 'flex-end',
    mt: 3,
  }
  
  const InvoiceModal: React.FC<InvoiceModalProps> = ({
    open,
    steps,
    handelClose,
    activeStep,
  }) => {
    return (
      <Modal
        open={open}
        onClose={handelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={modalStyles}
      >
        <Box sx={boxStyles}>
          <Paper elevation={2} sx={paperStyles}>
            <Typography id="modal-modal-title" variant="h5" component="h2" sx={titleStyles}>
              Your invoice is submitted - we'll take it from here!
            </Typography>
  
            <Stepper activeStep={activeStep} alternativeLabel connector={<></>}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel sx={stepIconStyles}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
  
            <Box sx={{ mt: 3 }}>
              <Typography id="modal-modal-description" component="p" sx={descriptionStyles}>
                Great job! Your invoice is now on its way to the client. A dedicated member of
                our team will make sure everything is in order before it goes out.
              </Typography>
              <Typography id="modal-modal-description" component="p" sx={descriptionStyles}>
                Your work here is done so lean back, enjoy life, and wait for the money.
              </Typography>
            </Box>
  
            <Box sx={buttonContainerStyles}>
              <Button onClick={handelClose} variant="contained">
                Close
              </Button>
            </Box>
          </Paper>
        </Box>
      </Modal>
    )
  }
  
  export default InvoiceModal
  