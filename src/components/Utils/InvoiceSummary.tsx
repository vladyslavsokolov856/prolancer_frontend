import { Card, Grid, Typography } from '@mui/material'
import { styled } from '@mui/system'

const StyledCard = styled(Card)({
  backgroundColor: '#343a40',
  color: '#f8f9fa',
  marginTop: '16px',
  marginBottom: '16px',
})

const Label = styled(Typography)({
  fontWeight: 'bold',
  color: '#9ba3a9',
})

const Value = styled(Typography)({})

const InvoiceSummary = () => {
  return (
    <StyledCard>
      <div style={{ padding: 16 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <div>
              <Label variant="body2">Invoices Found</Label>
              <Value>3</Value>
            </div>
          </Grid>
          <Grid item xs={2} style={{ textAlign: 'end' }}>
            <div>
              <Label variant="body2">Total Hours</Label>
              <Value>7</Value>
            </div>
          </Grid>
          <Grid item xs={2} style={{ textAlign: 'end' }}>
            <div>
              <Label variant="body2">
                Total Amount<span style={{ color: '#6c757d' }}> (ex. VAT)</span>
              </Label>
              <Value>DKK 1,202.00</Value>
            </div>
          </Grid>
        </Grid>
      </div>
    </StyledCard>
  )
}

export default InvoiceSummary
