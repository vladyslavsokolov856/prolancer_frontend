import { Box, Typography } from '@mui/material'
import DescriptionIcon from '@mui/icons-material/Description'
import React from 'react'

interface StatisticProps {
  backgroundColor?: string
  color?: string
  title: string
  amountContent: string
  countContent: string
}

const Statistic: React.FC<StatisticProps> = ({
  backgroundColor = 'white',
  color = 'white',
  title,
  amountContent,
  countContent,
}) => {
  return (
    <Box
      sx={{
        padding: '24px',
        width: '100%',
        height: '100%',
        position: 'relative',
        boxShadow: '0 0 8px 0 hsla(215,9%,64%,.15)',
        borderRadius: '0.25rem',
        backgroundColor,
        color,
      }}
    >
      <Box sx={{ position: 'absolute', right: '1.5rem' }}>
        <DescriptionIcon
          sx={{
            fontSize: '32px',
            opacity: '0.3',
            color: 'white',
            height: '48px',
          }}
        />
      </Box>
      <Typography
        variant="h6"
        sx={{
          fontSize: '12px',
          fontWeight: 700,
          marginBottom: '10px',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontSize: 'calc(1.3125rem + .75vw)',
          fontWeight: 700,
          marginTop: '12px',
          marginBottom: '12px',
        }}
      >
        {amountContent}
      </Typography>
      <span style={{ fontSize: '14.4px', fontWeight: 400 }}>
        {countContent}
      </span>
    </Box>
  )
}

export default Statistic
