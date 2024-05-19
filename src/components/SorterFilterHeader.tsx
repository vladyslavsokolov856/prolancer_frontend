import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import MicrosoftIcon from '@mui/icons-material/Microsoft'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import React, { useState } from 'react'

interface SorterFilterHeaderProps {
  children: React.ReactNode
}

const SorterFilterHeader: React.FC<SorterFilterHeaderProps> = ({
  children,
}) => {
  const [showFilterList, setShowFilterList] = useState<boolean>(false)

  const onFilterClick = () => {
    setShowFilterList((prev) => !prev)
  }

  return (
    <Box
      sx={{
        borderRadius: '0.2rem',
        background: 'linear-gradient(135deg, #0142c2, #0142c2 40%)',
        padding: '12px',
      }}
    >
      <Paper
        component="form"
        sx={{
          padding: 0,
          borderRadius: 0,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '40px',
        }}
      >
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Google Maps" />
        <IconButton
          sx={{
            borderLeft: '1px solid rgb(221, 221, 221) !important',
            backgroundColor: '#eef2f7',
            borderRadius: '0px !important',
          }}
        >
          <MicrosoftIcon />
        </IconButton>
        <IconButton
          color="primary"
          sx={{
            borderLeft: showFilterList
              ? 0
              : '1px solid rgb(221, 221, 221) !important',
            color: showFilterList ? 'white' : 'black',
            fontSize: '16px',
            borderRadius: '0px !important',
            backgroundColor: showFilterList ? 'rgb(49, 58, 70)' : '#eef2f7',
          }}
          onClick={onFilterClick}
        >
          <span>Filters</span>
          <FilterAltOutlinedIcon />
        </IconButton>
      </Paper>
      {showFilterList && (
        <Box
          sx={{
            backgroundColor: 'rgb(49, 58, 70)',
            padding: '0.75rem',
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  )
}

export default SorterFilterHeader
