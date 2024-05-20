import { Box } from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import CallOutlinedIcon from '@mui/icons-material/CallOutlined'

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        marginTop: 'auto',
        borderTop: '1px solid rgba(152, 166, 173, .2)',
        flexDirection: 'column',
        padding: '20px 24px',
        fontSize: '14.4px',
        textAlign: 'center',
      }}
      display="flex"
    >
      <div>
        <EmailOutlinedIcon fontSize="small" sx={{ marginRight: '15px' }} />
        <a
          href="mailto:kontakt@factofly.com"
          target="_blank"
          rel="noreferrer"
          style={{ color: '#0142c2', outline: 'none !important' }}
        >
          kontakt@factofly.com
        </a>
        <CallOutlinedIcon fontSize="small" sx={{ marginRight: '15px' }} />
        <a
          href="tel:%2B45%2071%2096%2000%2054"
          style={{ color: '#0142c2', outline: 'none !important' }}
        >
          +45 71 96 00 54
        </a>
      </div>
      <span style={{ color: 'rgb(152, 166, 173)' }}>
        Invoice with Factofly, no more accounting, more time to help your
        customers✌️
      </span>
      <div style={{ color: 'rgb(152, 166, 173)' }}>
        <span>v3.11.0</span> - 2024© Factofly - Made with ❤️ in Copenhagen
      </div>
    </Box>
  )
}

export default Footer
