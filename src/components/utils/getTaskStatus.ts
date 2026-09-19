import type { TaskModel } from "../../models/TaskModel";

export function getTaskStatus(task: TaskModel, activeTask: TaskModel) {
    if(task.completeDate) return 'Completo'
    if(task.interruptDate) return 'Incompleto'
    if(task.id === activeTask?.id) return 'Em progresso'
    return 'Abandonada'
}