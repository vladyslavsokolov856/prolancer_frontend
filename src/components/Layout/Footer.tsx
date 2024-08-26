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
          href="mailto:kontakt@prolancer.dk"
          target="_blank"
          rel="noreferrer"
          style={{ color: '#0142c2', outline: 'none !important' }}
        >
          kontakt@prolancer.dk
        </a>
        <CallOutlinedIcon fontSize="small" sx={{ marginRight: '15px' }} />
        <a
          href="tel:%2B45%2071%2096%2000%2054"
          style={{ color: '#0142c2', outline: 'none !important' }}
        >
          +45 25943954
        </a>
      </div>
      <span style={{ color: 'rgb(152, 166, 173)' }}>
        Invoicing with Prolancer, focus on your work and passion, not
        accounting.
      </span>
    </Box>
  )
}

export default Footer
