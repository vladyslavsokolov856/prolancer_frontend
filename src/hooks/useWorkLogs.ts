import {
  useQuery,
  UseQueryResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import {
  fetchWorkLogs,
  fetchWorkLog,
  createWorkLog,
  editWorkLog,
  deleteWorkLog,
} from '@/services/workLogService'
import WorkLog from '@/types/workLogs'

export const useWorkLogs = () => {
  const {
    data: workLogs,
    isLoading,
    isError,
    error,
  }: UseQueryResult<WorkLog[], Error> = useQuery({
    queryKey: ['workLogs'],
    queryFn: fetchWorkLogs,
  })

  return {
    workLogs: workLogs || [],
    isLoading,
    isError,
    error,
  }
}

export const useWorkLog = (id: number) => {
  const {
    data: workLog,
    isLoading,
    isError,
    error,
  }: UseQueryResult<WorkLog, Error> = useQuery({
    queryKey: ['workLogs', id],
    queryFn: () => fetchWorkLog(id),
  })

  return {
    workLog: workLog || null,
    isLoading,
    isError,
    error,
  }
}

export const useCreateWorkLog = () => {
  const queryClient = useQueryClient()
  const {
    mutate: createWorkLogMutation,
    isSuccess: isCreated,
    isPending: isCreating,
    data,
  } = useMutation({
    mutationFn: createWorkLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workLogs'] })
    },
  })

  return {
    createdWorkLog: data,
    createWorkLogMutation,
    isCreated,
    isCreating,
  }
}

export const useEditWorkLog = () => {
  const queryClient = useQueryClient()
  const {
    mutate: updateWorkLogMutation,
    isSuccess: isEdited,
    isPending: isEditing,
  } = useMutation({
    mutationFn: ({ id, workLogData }: { id: number; workLogData: WorkLog }) =>
      editWorkLog(id, workLogData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workLogs'] })
    },
  })

  return {
    updateWorkLogMutation,
    isEdited,
    isEditing,
  }
}

export const useDeleteWorkLog = () => {
  const queryClient = useQueryClient()
  const {
    mutate: deleteWorkLogMutation,
    isSuccess: isDeleted,
    isPending: isDeleting,
  } = useMutation({
    mutationFn: deleteWorkLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workLogs'] })
    },
  })

  return {
    deleteWorkLogMutation,
    isDeleting,
    isDeleted,
  }
}
