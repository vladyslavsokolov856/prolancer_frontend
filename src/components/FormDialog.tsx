import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'

type ColorType =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning'

interface FormDialogProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string | React.ReactNode
  content: string | React.ReactNode
  submitText?: string
  cancelText?: string
  submitTextColor?: ColorType
  cancelTextColor?: ColorType
  showActionButtons?: boolean
  onSubmit?: () => Promise<void> | void
}

const FormDialog: React.FC<FormDialogProps> = ({
  open,
  setOpen,
  title,
  content,
  submitText = 'Confirm',
  cancelText = 'Cancel',
  submitTextColor = 'primary',
  cancelTextColor = 'primary',
  showActionButtons = false,
  onSubmit,
}) => {
  const handleSubmit = async () => {
    if (onSubmit) {
      try {
        await onSubmit()
        setOpen(false)
      } catch (error) {
        console.error('Error in onSubmit:', error)
      }
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
      <DialogTitle>{title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'rgb(100,100,100)',
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>{content}</DialogContent>
      {showActionButtons && (
        <DialogActions>
          <Button onClick={handleSubmit} color={submitTextColor}>
            {submitText}
          </Button>
          <Button onClick={handleClose} color={cancelTextColor} autoFocus>
            {cancelText}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

export default FormDialog
