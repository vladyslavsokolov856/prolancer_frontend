import { useCurrencyRates } from '@/hooks/useCurrencyRates'
import Invoice from '@/types/invoices'
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

type InvoiceSummaryProps = {
  list: Invoice[]
}
const InvoiceSummary = ({ list: invoices }: InvoiceSummaryProps) => {
  const { currencyRates } = useCurrencyRates()
  const totalInvoices = invoices.length
  let totalHours = 0
  let totalAmount = 0
  invoices.forEach((invoice) => {
    const amount = invoice.amount
    const currency = invoice.currency || 'DKK'
    const convertedAmount = amount / (currencyRates[currency] || 1)
    totalAmount += convertedAmount
    totalHours += +invoice.hours_worked || 0
  })
  return (
    <StyledCard>
      <div style={{ padding: 16 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <div>
              <Label variant="body2">Invoices Found</Label>
              <Value>{totalInvoices}</Value>
            </div>
          </Grid>
          <Grid item xs={2} style={{ textAlign: 'end' }}>
            <div>
              <Label variant="body2">Total Hours</Label>
              <Value>{totalHours}</Value>
            </div>
          </Grid>
          <Grid item xs={2} style={{ textAlign: 'end' }}>
            <div>
              <Label variant="body2">
                Total Amount<span style={{ color: '#6c757d' }}> (ex. VAT)</span>
              </Label>
              <Value>
                {'DKK ' +
                  new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(totalAmount)}
              </Value>
            </div>
          </Grid>
        </Grid>
      </div>
    </StyledCard>
  )
}

export default InvoiceSummary
