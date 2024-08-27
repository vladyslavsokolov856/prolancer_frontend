import { Box, Typography } from '@mui/material'

import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import { DropzoneOptions, useDropzone } from 'react-dropzone'
import React, { PropsWithChildren } from 'react'

type ProFileField = DropzoneOptions

const ProFileField: React.FC<
  PropsWithChildren<
    ProFileField & {
      onChange: (...event: any[]) => void
    }
  >
> = ({ multiple, onDrop, onChange, children, ...rest }) => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple,
    onDrop,
    ...rest,
  })

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      sx={{
        width: 'full',
        height: 128,
        borderWidth: 1,
        borderStyle: 'dashed',
      }}
      {...getRootProps()}
    >
      <input {...getInputProps({ onChange })} />
      <CloudUploadOutlinedIcon sx={{ width: 40, height: 40 }} />
      <Typography variant="h6">Drop files here or click to upload</Typography>
      {children}
    </Box>
  )
}

export default ProFileField
