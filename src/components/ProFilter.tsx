import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IListItem, ISortItem } from '@/pages/time'
import dayjs from 'dayjs'
import ArrowDownIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpIcon from '@mui/icons-material/ArrowUpward'

type Filter = 'select' | 'date' | 'checkbox'

interface IFilterItem {
  key: number
  name: string
}

export interface IFilter {
  name: string
  type: Filter
  key: string
  items?: IFilterItem[]
  columnSize: number
}

type IListItemKey = keyof IListItem

interface IProFilter {
  filters: IFilter[]
  sortItems: ISortItem[]
  setItems: Dispatch<SetStateAction<IListItem[]>>
  searchFields: IListItemKey[]
  originalListItems: IListItem[]
}

type IFilterOptions = {
  [key in IListItemKey]?: string
}

const ProFilter: React.FC<IProFilter> = ({
  filters,
  sortItems,
  setItems,
  searchFields,
  originalListItems,
}) => {
  const [showFilterList, setShowFilterList] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [rowsPerPage, setRowsPerPage] = useState<number>(100)
  const [filterOptions, setFilterOptions] = useState<IFilterOptions>({})
  const [page] = useState<number>(0)
  const [sortField, setSortField] = useState<IListItemKey | null>()
  const [sortDirection, setSortDirection] = useState<boolean>(false)

  const onFilterClick = () => {
    setShowFilterList((prev) => !prev)
  }

  const handleFilterOptions = (key: string, value: string) => {
    setFilterOptions((prev) => ({ ...prev, [key]: value }))
  }

  useEffect(() => {
    const startIndex = page * rowsPerPage
    const endIndex = startIndex + rowsPerPage

    const filteredData = originalListItems.filter((item) =>
      searchFields
        .map((field) => item[field])
        .some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(search.toLowerCase())
        )
    )

    const filteredItems = filteredData
      .filter((item) => {
        return Object.keys(filterOptions).every((key) => {
          return (
            item.hasOwnProperty(key) &&
            item[key as IListItemKey] === filterOptions[key as IListItemKey]
          )
        })
      })
      .slice(startIndex, endIndex)

    let sortedItems = filteredItems
    if (sortField)
      sortedItems = sortField
        ? filteredItems.sort((a, b) => {
            if (a[sortField]! < b[sortField]!) return sortDirection ? -1 : 1
            if (a[sortField]! > b[sortField]!) return sortDirection ? 1 : -1
            return 0
          })
        : filteredItems
    setItems(sortedItems)
  }, [search, filterOptions, sortField, sortDirection])

  const handleToggleSorDirection = () => {
    if (sortField) setSortDirection((prev) => !prev)
  }

  const handleSortFieldChange = (e: any) => {
    setSortField(e.target.value)
  }

  return (
    <Box
      sx={{
        borderRadius: '0.2rem',
        background: 'linear-gradient(135deg, #0142c2, #0142c2 40%)',
        padding: '12px',
        marginTop: '20px',
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
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          onChange={(e) => setSearch(e.target.value)}
        />
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
          <Box sx={{ color: 'rgb(255, 255, 255)' }}>
            <Grid container spacing={2} alignItems="end">
              {filters &&
                filters.map(({ name, type, key, items, columnSize }, index) => (
                  <Grid item xs={12} md={columnSize} key={index}>
                    <Box display="flex" flexDirection="column">
                      <span>{name}</span>
                      {type === 'select' ? (
                        <Box display="flex" sx={{ width: '100%' }}>
                          <FormControl
                            fullWidth
                            sx={{ backgroundColor: 'white' }}
                          >
                            <Select
                              defaultValue=""
                              onChange={(e) =>
                                handleFilterOptions(
                                  key,
                                  e.target.value as string
                                )
                              }
                            >
                              {items?.map(({ key, name }) => (
                                <MenuItem value={key} key={key}>
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      ) : type === 'date' ? (
                        <Box>
                          <DatePicker
                            onChange={(date) =>
                              handleFilterOptions(
                                key,
                                dayjs(date).format('M/D/YYYY')
                              )
                            }
                            sx={{ backgroundColor: 'white' }}
                          />
                        </Box>
                      ) : (
                        <Box>
                          <Checkbox />
                        </Box>
                      )}
                    </Box>
                  </Grid>
                ))}

              <Grid item xs={12} md={3} display="flex">
                <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
                  <Select
                    value={sortField || ''}
                    onChange={handleSortFieldChange}
                  >
                    {sortItems.map(({ name, field }) => (
                      <MenuItem key={field} value={field}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  sx={{
                    color: 'white',
                    backgroundColor: '#6c757d',
                    ':hover': { backgroundColor: '#5c636a' },
                  }}
                  onClick={handleToggleSorDirection}
                >
                  {sortDirection ? <ArrowUpIcon /> : <ArrowDownIcon />}
                </Button>
              </Grid>

              <Grid item xs={12} md={3}>
                <Box
                  display="flex"
                  sx={{
                    width: '100%',
                    alignItems: 'center',
                    gap: '5px',
                    justifyContent: 'flex-end',
                  }}
                >
                  <span>Number of Entities</span>
                  <FormControl
                    fullWidth
                    sx={{ backgroundColor: 'white', width: '100px' }}
                  >
                    <Select
                      defaultValue={100}
                      onChange={(e) => setRowsPerPage(e.target.value as number)}
                    >
                      <MenuItem value="25">25</MenuItem>
                      <MenuItem value="50">50</MenuItem>
                      <MenuItem value="100">100</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default ProFilter
