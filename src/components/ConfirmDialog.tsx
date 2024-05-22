import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface ConfirmDialogProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string | React.ReactNode
  content: string | React.ReactNode
  submitText?: string
  cancelText?: string
  onSubmit?: () => Promise<void> | void
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  setOpen,
  title,
  content,
  submitText = 'Submit',
  cancelText = 'Cancel',
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
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>{submitText}</Button>
        <Button onClick={handleClose} autoFocus>
          {cancelText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
