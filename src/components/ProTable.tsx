import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'transparent',
    color: '#6c757d',
    fontWeight: 'bold',
    boxShadow: 'inset 0 0 0 9999px transparent',
  },
  [`&.${tableCellClasses.body}`]: {
    color: '#6c757d',
    fontSize: '0.9rem',
    fontWeight: 400,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: 'rgba(222,226,230,.4)',
  },
  '&:nth-of-type(odd)': {
    backgroundColor: 'transparent',
  },
}))

export interface RecordType {
  [key: string]: any
}

export interface ColumnType {
  key: string
  name: String
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  render?: (value: any, record: RecordType, index: number) => React.ReactNode
}

interface IProTable {
  columns: ColumnType[]
  data: RecordType[]
}

const ProTable: React.FC<IProTable> = ({ columns, data }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        border: '1px solid rgb(222, 226, 230)',
        borderRadius: '3px',
        clear: 'both',
        marginTop: '6px !important',
        marginBottom: '6px !important',
        maxWidth: 'none !important',
        borderCollapse: 'separate !important',
        borderSpacing: 0,
        backgroundColor: 'transparent',
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(({ key, name, align }) => (
              <StyledTableCell key={key} align={align || 'left'}>
                {name}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => {
            return (
              <StyledTableRow key={`row ${index}`}>
                {columns.map((column, rowIndex) => {
                  if (column.render)
                    return (
                      <StyledTableCell>
                        {column.render(row[column.key], row, rowIndex)}
                      </StyledTableCell>
                    )
                  else
                    return <StyledTableCell>{row[column.key]}</StyledTableCell>
                })}
              </StyledTableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProTable
