import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
  styled,
} from '@mui/material'
import ApartmentIcon from '@mui/icons-material/Apartment'
import LogoIcon from '@/components/Utils/LogoIcon'
import PhoneIcon from '@mui/icons-material/Phone'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useEditTask, useTaskByIdentifer } from '@/hooks/useTasks'
import { useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { useJobTypes } from '@/hooks/useJobTypes'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'

const Title = styled('span')({
  fontWeight: 700,
  fontSize: '2.25rem',
  color: 'rgb(108, 117, 125)',
})

const StyledCardHeader = styled(CardHeader)({
  padding: '.75rem 1.5rem',
  marginBottom: 0,
  backgroundColor: '#fff',
  borderBottom: '1px solid rgba(0, 0, 0, .125)',
})

const paymentTypes = [
  { key: 'per_day', name: 'Per day' },
  { key: 'per_hour', name: 'Per hour' },
  { key: 'project_price', name: 'Project price' },
]

const paymentTerms = [
  { key: 'current_month', name: 'Current month' },
  { key: 'onging_week', name: 'Onging week' },
  { key: 'other', name: 'Other' },
  { key: 'task_end', name: 'Task end' },
]

const TaskDetailsByIdentifierPage = () => {
  const { identifier } = useParams()
  const { task, isLoading } = useTaskByIdentifer(identifier || '')
  const { data: jobTypes, isLoading: isJobTypesLoading } = useJobTypes()
  const { enqueueSnackbar } = useSnackbar()
  const { isEdited, updateTaskMutation } = useEditTask()
  const [statusType, setStatusType] = useState('sent')

  const taskData = useMemo(
    () => ({
      ...task,
      paymentType: paymentTypes.find((item) => item.key === task?.payment_type),
      paymentTerm: paymentTerms.find((item) => item.key === task?.payment_term),
      jobType: jobTypes?.find((item) => item.id === task?.job_type_id),
    }),
    [task, jobTypes]
  )

  const handleApprove = () => {
    if (task) {
      setStatusType('approved')
      updateTaskMutation({
        ...task,
        status: 'approved',
      })
    }
  }

  const handleDecline = () => {
    if (task) {
      setStatusType('declined')
      updateTaskMutation({
        ...task,
        status: 'declined',
      })
    }
  }

  useEffect(() => {
    if (isEdited) {
      if (statusType === 'approved')
        enqueueSnackbar('Task is Approved!', { variant: 'success' })
      else if (statusType === 'declined')
        enqueueSnackbar('Task is Declined!', { variant: 'success' })
    }
  }, [isEdited, enqueueSnackbar, statusType])

  if (isLoading || isJobTypesLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: 'calc(100vh - 100px)' }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: 'white', height: '70px' }}
      >
        <LogoIcon color="black" width="260px" height="50px" />
      </Box>

      <Box
        sx={{
          paddingRight: '12px',
          paddingLeft: '12px',
          paddingTop: '4.5rem',
          paddingBottom: '4.5rem',
        }}
      >
        <Container>
          {!task ? (
            <Typography
              variant="h1"
              sx={{
                fontSize: 'calc(1.3125rem + .75vw)',
                fontWeight: 700,
                textAlign: 'center',
              }}
            >
              Failed to load task approval form. Contact support
            </Typography>
          ) : (
            <Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="baseline"
              >
                <Title>{task.title}</Title>
                <Chip
                  label={taskData.status?.toUpperCase()}
                  color={
                    taskData.status === 'approved'
                      ? 'success'
                      : taskData.status === 'declined'
                      ? 'error'
                      : 'primary'
                  }
                  size="small"
                  sx={{ borderRadius: '2px' }}
                />
              </Box>

              <Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8} sx={{ color: '#6c757d' }}>
                    <Box className="step">
                      <Box className="steper">
                        <Card sx={{ width: '100%' }}>
                          <StyledCardHeader
                            sx={{ color: '#6c757d' }}
                            title={
                              <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Typography
                                  variant="h4"
                                  sx={{ fontSize: '1.125rem', fontWeight: 700 }}
                                >
                                  Review details
                                </Typography>
                                {/* <div style={{ fontSize: '14.4px' }}>done</div> */}
                              </Box>
                            }
                          />
                          <CardContent>
                            <Grid
                              container
                              sx={{
                                fontSize: '14.4px',
                                fontFamily:
                                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
                              }}
                            >
                              <Grid item sm={12} md={6}>
                                <div
                                  style={{
                                    color: 'rgb(152, 166, 173)',
                                    fontWeight: 700,
                                  }}
                                >
                                  Job type
                                </div>
                                <div style={{ color: 'rgb(108, 117, 125)' }}>
                                  {taskData?.jobType?.name}
                                </div>
                              </Grid>
                              <Grid item sm={12} md={6}>
                                <div
                                  style={{
                                    color: 'rgb(152, 166, 173)',
                                    fontWeight: 700,
                                  }}
                                >
                                  Timeline
                                </div>
                                <div style={{ color: 'rgb(108, 117, 125)' }}>
                                  {`${dayjs(taskData?.start_date).format(
                                    'MMM DD'
                                  )} → ${dayjs(taskData?.end_date).format(
                                    'MMM DD, YYYY'
                                  )}`}
                                </div>
                              </Grid>
                              <Grid item sm={12} sx={{ marginTop: '10px' }}>
                                <div
                                  style={{
                                    color: 'rgb(152, 166, 173)',
                                    fontWeight: 700,
                                  }}
                                >
                                  Task description
                                </div>
                                <div style={{ color: 'rgb(108, 117, 125)' }}>
                                  {taskData?.description}
                                </div>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>

                        <Accordion
                          sx={{
                            marginTop: '20px',
                            marginBottom: '20px !important',
                            padding: 0,
                          }}
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography
                              variant="h4"
                              sx={{
                                fontSize: '1.125rem',
                                fontWeight: 700,
                                padding: '.75rem 1.5rem',
                                color: '#6c757d',
                              }}
                            >
                              Terms of Agreement
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <p
                              style={{
                                maxHeight: '250px',
                                overflowX: 'auto',
                                border: '1px solid rgb(223, 223, 223)',
                                padding: '1rem',
                                color: 'rgb(175, 175, 175)',
                              }}
                            >
                              Prolancer is a freelance agency or umbrella company
                              helping solopreneurs to invoice w/o a need for a
                              registered business, hereby freeing up time for
                              their business. Time that can be used to focus on
                              the work you have ordered.
                              <br />
                              <br />
                              When you as a client are being invoiced through
                              Prolancer, you can be at ease knowing that all
                              parties are fully compliant. We insure our users
                              while working, and make sure VAT and taxes are
                              filed accordingly.
                              <br />
                              <br />
                              We are admin experts, and the biggest umbrella
                              company in Denmark with more than 6.000 users. If
                              this offer raises any questions or concerns, we
                              are available at +4571960054 or via
                              kontakt@Prolancer.com <br />
                              <br />
                              This offer has been sent from the user without the
                              interference of Prolancer. The validity of the
                              offer is under the condition of Prolancer’s
                              approval after you have accepted the offer.
                              Prolancer is not bound by this offer, fully or
                              partially, until this accept has been granted.
                            </p>
                            <FormGroup>
                              <FormControlLabel
                                disabled
                                control={<Checkbox checked />}
                                label="I have read, understood, and accept the Terms of Agreement."
                              />
                            </FormGroup>
                          </AccordionDetails>
                        </Accordion>
                      </Box>

                      <Box className="steper" sx={{ marginBottom: '20px' }}>
                        <Card sx={{ width: '100%' }}>
                          <StyledCardHeader
                            sx={{ color: '#6c757d' }}
                            title={
                              <Box>
                                <Typography
                                  variant="h4"
                                  sx={{ fontSize: '1.125rem', fontWeight: 700 }}
                                >
                                  Receive invoice
                                </Typography>
                                <div style={{ fontSize: '14.4px' }}>
                                  By email, as per agreement
                                </div>
                              </Box>
                            }
                          />
                        </Card>
                      </Box>

                      <Box
                        className="last-steper"
                        sx={{ marginBottom: '20px' }}
                      >
                        <Card sx={{ width: '100%' }}>
                          <StyledCardHeader
                            sx={{ color: '#6c757d' }}
                            title={
                              <Typography
                                variant="h4"
                                sx={{ fontSize: '1.125rem', fontWeight: 700 }}
                              >
                                Pay invoice
                              </Typography>
                            }
                          />
                          <CardContent>
                            <Grid
                              container
                              sx={{
                                fontSize: '14.4px',
                                fontFamily:
                                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
                              }}
                            >
                              <Grid item sm={12} md={4}>
                                <div
                                  style={{
                                    color: 'rgb(152, 166, 173)',
                                    fontWeight: 700,
                                  }}
                                >
                                  Payment type
                                </div>
                                <div style={{ color: 'rgb(108, 117, 125)' }}>
                                  {taskData?.paymentType?.name}
                                </div>
                              </Grid>
                              <Grid item sm={12} md={4}>
                                <div
                                  style={{
                                    color: 'rgb(152, 166, 173)',
                                    fontWeight: 700,
                                  }}
                                >
                                  Payment Term
                                </div>
                                <div style={{ color: 'rgb(108, 117, 125)' }}>
                                  {taskData?.paymentTerm?.name}
                                </div>
                              </Grid>
                              <Grid item sm={12} md={4}>
                                <div
                                  style={{
                                    color: 'rgb(152, 166, 173)',
                                    fontWeight: 700,
                                  }}
                                >
                                  Payment days
                                </div>
                                <div style={{ color: 'rgb(108, 117, 125)' }}>
                                  {taskData?.payment_term_days}
                                </div>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Box>
                    </Box>

                    {taskData?.status === 'sent' && (
                      <Box
                        display="flex"
                        justifyContent="flex-end"
                        sx={{ gap: '5px', marginTop: '10px' }}
                      >
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => handleApprove()}
                        >
                          Approve
                        </Button>
                        <Button
                          color="error"
                          variant="contained"
                          onClick={() => handleDecline()}
                        >
                          Decline
                        </Button>
                      </Box>
                    )}
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Card>
                          <StyledCardHeader
                            title={
                              <Typography
                                variant="h4"
                                sx={{ fontSize: '1.125rem', fontWeight: 700 }}
                              >
                                Customer
                              </Typography>
                            }
                          />
                          <StyledCardHeader
                            title={
                              <Box
                                display="flex"
                                alignItems="center"
                                sx={{ gap: '0.75rem' }}
                              >
                                <Avatar>
                                  <ApartmentIcon />
                                </Avatar>

                                <Box display="flex" flexDirection="column">
                                  <div
                                    style={{
                                      fontWeight: 700,
                                      color: '#98a6ad',
                                    }}
                                  >
                                    {taskData?.customer?.name_contact_person}
                                  </div>
                                  <a
                                    href={`mailto:${taskData?.customer?.email_contact_person}`}
                                    style={{
                                      display: 'inline-block',
                                      width: '100%',
                                      textOverflow: 'ellipsis',
                                      overflow: 'hidden',
                                      whiteSpace: 'nowrap',
                                      color: '#0142c2',
                                      fontSize: '0.9rem',
                                    }}
                                  >
                                    {taskData?.customer?.email_contact_person}
                                  </a>
                                </Box>
                              </Box>
                            }
                          />
                          <CardContent>
                            <Box
                              display="flex"
                              flexDirection="column"
                              sx={{ color: 'rgb(108, 117, 125)' }}
                            >
                              <div
                                style={{ fontSize: '14.4px', fontWeight: 600 }}
                              >
                                Customer details
                              </div>
                              <p>
                                {taskData?.customer?.company_name}
                                <br />
                                {taskData?.customer?.address}
                                <br />
                                {taskData?.customer?.postal_code}{' '}
                                {taskData?.customer?.city}
                                <br />
                                CVR:
                                <br />
                                <PhoneIcon />{' '}
                                {taskData?.customer?.phone_contact_person}
                              </p>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12}>
                        <Card>
                          <StyledCardHeader
                            title={
                              <Typography
                                variant="h4"
                                sx={{ fontSize: '1.125rem', fontWeight: 700 }}
                              >
                                Supplier
                              </Typography>
                            }
                          />
                          <StyledCardHeader
                            title={
                              <Box
                                display="flex"
                                alignItems="center"
                                sx={{ gap: '0.75rem' }}
                              >
                                <Avatar>
                                  <PermIdentityIcon />
                                </Avatar>

                                <Box display="flex" flexDirection="column">
                                  <div
                                    style={{
                                      fontWeight: 700,
                                      color: '#98a6ad',
                                    }}
                                  >
                                    David
                                  </div>
                                </Box>
                              </Box>
                            }
                          />
                          <CardContent>
                            <Box
                              display="flex"
                              flexDirection="column"
                              sx={{ color: 'rgb(108, 117, 125)' }}
                            >
                              <div
                                style={{ fontSize: '14.4px', fontWeight: 600 }}
                              >
                                Employed by
                              </div>
                              <p>
                                Prolancer Aps
                                <br />
                                Danneskiold-Samsøes Allé 41
                                <br />
                                1434 København K, Danmark
                                <br />
                                CVR: DK39781689
                                <br />
                                <MailOutlineIcon />{' '}
                                <a
                                  href="mailto:kontakt@Prolancer.com"
                                  style={{ color: 'blue' }}
                                >
                                  kontakt@Prolancer.com
                                </a>
                              </p>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  )
}

export default TaskDetailsByIdentifierPage
