import { IListItem } from '@/pages/time'
import { Box } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import ProListItem from './ProListItem'

interface IProList {
  items: IListItem[]
  setItems: Dispatch<SetStateAction<IListItem[]>>
}

const ProList: React.FC<IProList> = ({ items, setItems }) => {
  return (
    <Box sx={{ marginTop: '20px' }}>
      {items.map((item) => (
        <ProListItem key={item.id} item={item} setItems={setItems} />
      ))}
    </Box>
  )
}

export default ProList
