import Task from '@/types/tasks'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import dayjs from 'dayjs'

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 10,
  },
  col: {
    flex: 1,
  },
  bold: {
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    // borderTop: '1px solid #ccc',
    // borderBottom: '1px solid #ccc',
  },
  tableHeader: {
    borderBottom: '1px solid #ccc',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottom: '1px solid #ccc',
  },
  tableCell: {
    flex: 1,
    padding: 5,
    border: '1px solid #000',
  },
  tableCellFirst: {
    borderLeft: 'none',
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  textAlignRight: {
    textAlign: 'right',
  },
})

export const TaskWorkLogPdf = ({
  task,
}: {
  task: Task & {
    user_name?: string
    customer_name?: string
    customer_address?: string
    customer_city?: string
    customer_postal_code?: string
    job_type_name?: string
  }
}) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.col}>Time registration</Text>
            <Text style={[styles.col, styles.textAlignRight]}>factofly</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.bold}>User</Text>
              <Text>{task.user_name}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.bold}>Customer</Text>
              <Text>{task.customer_name}</Text>
              <Text>{task.customer_address}</Text>
              <Text>
                {task.customer_city} {task.customer_postal_code}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.bold}>Task Information</Text>
              <View style={styles.row}>
                <Text style={styles.col}>Start date</Text>
                <Text style={[styles.col, styles.textAlignRight]}>
                  {dayjs(task.start_date).format('D.M.YYYY')}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.col}>End date</Text>
                <Text style={[styles.col, styles.textAlignRight]}>
                  {dayjs(task.end_date).format('D.M.YYYY')}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.col}>Number of minutes</Text>
                <Text style={[styles.col, styles.textAlignRight]}>
                  {task.expected_minutes}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.col}>Job type</Text>
                <Text style={[styles.col, styles.textAlignRight]}>
                  {task.job_type_name}
                </Text>
              </View>
            </View>
            <View style={styles.col}>
              <Text style={styles.bold}>Title</Text>
              <Text>{task.title}</Text>
            </View>
          </View>
        </View>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.flex2]}>Start date</Text>
            <Text style={[styles.tableCell, styles.flex2]}>Start time</Text>
            <Text style={[styles.tableCell, styles.flex2]}>
              Duration (minutes)
            </Text>
            <Text style={[styles.tableCell, styles.flex3]}>Notes</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.flex2]}>value</Text>
            <Text style={[styles.tableCell, styles.flex2]}>value</Text>
            <Text style={[styles.tableCell, styles.flex2]}>value</Text>
            <Text style={[styles.tableCell, styles.flex3]}>Notes</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
