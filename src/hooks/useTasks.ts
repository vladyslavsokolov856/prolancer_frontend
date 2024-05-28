import {
  useQuery,
  UseQueryResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import {
  fetchTasks,
  fetchTask,
  createTask,
  editTask,
  deleteTask,
} from '@/services/taskService'
import Task from '@/types/tasks'

export const useTasks = () => {
  const {
    data: tasks,
    isLoading,
    isError,
    error,
  }: UseQueryResult<Task[], Error> = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  })

  return {
    tasks: tasks || [],
    isLoading,
    isError,
    error,
  }
}

export const useTask = (id: number) => {
  const {
    data: task,
    isLoading,
    isError,
    error,
  }: UseQueryResult<Task, Error> = useQuery({
    queryKey: ['tasks', id],
    queryFn: () => fetchTask(id),
  })

  return {
    task: task || null,
    isLoading,
    isError,
    error,
  }
}

export const useCreateTask = () => {
  const queryClient = useQueryClient()
  const {
    mutate: createTaskMutation,
    isSuccess: isCreated,
    isPending: isCreating,
  } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  return {
    createTaskMutation,
    isCreated,
    isCreating,
  }
}

export const useEditTask = (id: number) => {
  const queryClient = useQueryClient()
  const {
    mutate: updateTaskMutation,
    isSuccess: isEdited,
    isPending: isEditing,
  } = useMutation({
    mutationFn: (taskData: Task) => editTask(id, taskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  return {
    updateTaskMutation,
    isEdited,
    isEditing,
  }
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()
  const { mutate: deleteTaskMutation, isPending: isDeleting } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  return {
    deleteTaskMutation,
    isDeleting,
  }
}
