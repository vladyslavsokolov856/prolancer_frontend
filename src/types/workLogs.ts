export default interface WorkLog {
  id: number
  notes: string
  status?: string
  user_id?: string
  task_id?: number
  start_time: string
  duration_minutes: number
  deleted?: boolean
}
