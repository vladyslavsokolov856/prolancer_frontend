import Task from '@/types/tasks'
import WorkLog from '@/types/workLogs'
import {
  Font,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer'
import dayjs from 'dayjs'
import Roboto from '@/assets/fonts/Roboto/Roboto-Regular.ttf'
import RobotoBold from '@/assets/fonts/Roboto/Roboto-Bold.ttf'

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: Roboto,
    },
    {
      src: RobotoBold,
      fontWeight: 'bold',
    },
  ],
})

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: 'Roboto',
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
    border: '1px solid #000',
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
    border: '1px solid #000',
  },
  flex3: {
    flex: 3,
  },
  flex5: {
    flex: 5,
    border: '1px solid #000',
  },
  flex7: {
    flex: 7,
    border: '1px solid #000',
  },
  textAlignRight: {
    textAlign: 'right',
  },
})

export const TaskWorkLogPdf = ({
  task,
  workLogs,
}: {
  task: Task & {
    user_name?: string
    customer_name?: string
    customer_address?: string
    customer_city?: string
    customer_postal_code?: string
    job_type_name?: string
  }
  workLogs: WorkLog[]
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
                <Text style={styles.flex5}>Start date</Text>
                <Text style={[styles.flex7, styles.textAlignRight]}>
                  {dayjs(task.start_date).format('D.M.YYYY')}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.flex5}>End date</Text>
                <Text style={[styles.flex7, styles.textAlignRight]}>
                  {dayjs(task.end_date).format('D.M.YYYY')}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.flex5}>Number of minutes</Text>
                <Text style={[styles.flex7, styles.textAlignRight]}>
                  {task.expected_minutes}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.flex5}>Job type</Text>
                <Text style={[styles.flex7, styles.textAlignRight]}>
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
          {workLogs.map((workLog) => {
            const date = dayjs(workLog.start_time)
            return (
              <View style={styles.tableRow} key={workLog.id}>
                <Text style={[styles.tableCell, styles.flex2]}>
                  {date.format('M/D/YYYY')}
                </Text>
                <Text style={[styles.tableCell, styles.flex2]}>
                  {date.format('h:mm:ss A')}
                </Text>
                <Text style={[styles.tableCell, styles.flex2]}>
                  {workLog.duration_minutes}
                </Text>
                <Text style={[styles.tableCell, styles.flex3]}>
                  {workLog.notes}
                </Text>
              </View>
            )
          })}
        </View>
      </Page>
    </Document>
  )
}
