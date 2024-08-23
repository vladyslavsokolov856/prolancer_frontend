import { IListItem } from '@/pages/time'
import { Box } from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react'
import ProListItem from './ProListItem'
import ConfirmDialog from './ConfirmDialog'

interface IProList {
  items: IListItem[]
  setItems: Dispatch<SetStateAction<IListItem[]>>
}

const ProList: React.FC<IProList> = ({ items, setItems }) => {
  const [open, setOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>({})

  const handleDeleteClick = (params: any) => {
    setSelectedItem(params)
    setOpen(true)
  }

  return (
    <Box sx={{ marginTop: '20px' }}>
      {items.map((item) => (
        <ProListItem
          key={item.id}
          item={item}
          setItems={setItems}
          confirmDelete={handleDeleteClick}
        />
      ))}
      <ConfirmDialog
        open={open}
        setOpen={setOpen}
        title={`Delete Deduction`}
        content="Are you sure you want to delete this deduction?"
        onSubmit={() => {
          selectedItem.onConfirm()
        }}
      />
    </Box>
  )
}

export default ProList
