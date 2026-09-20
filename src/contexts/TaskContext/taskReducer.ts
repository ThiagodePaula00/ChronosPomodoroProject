import { formatSecondsToMinutes } from '../../components/utils/formatSecondsToMinutes';
import { getNextCycle } from '../../components/utils/getNextCycle';
import type { TaskStateModel } from '../../models/TaskStateModel';
import { initialTaskState } from './initialTaskState';
import { TaskActionTypes } from './taskActions';
import type { TaskActionModel } from './taskActions';

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel,
): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {

        const newTask = action.payload;
        const nextCycle = getNextCycle(state.currentCycle);
        const secondsRemaining = newTask.duration * 60;

        return {
            ...state,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...state.tasks, newTask],
      };
    }

    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(tasks => {
            if (state.activeTask && state.activeTask.id === tasks.id) {
                return {...tasks, interruptDate: Date.now() };
            }
            return tasks;
                }),
      };
    }

    case TaskActionTypes.COMPLETE_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(tasks => {
            if (state.activeTask && state.activeTask.id === tasks.id) {
                return {...tasks, completeDate: Date.now() };
            }
            return tasks;
                }),
      };
    }

    case TaskActionTypes.RESET_STATE: {
      return {...initialTaskState };
    }
    case TaskActionTypes.COUNT_DOWN: {
      return {
        ...state,
        secondsRemaining: action.payload.secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(action.payload.secondsRemaining),
      }
    }

        case TaskActionTypes.CHANGE_SETTINGS: {
      return {...state, config: {...action.payload} };
        }
  }

  // Sempre deve retornar o estado
  return state;
}