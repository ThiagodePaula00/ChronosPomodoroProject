import { useEffect, useReducer, type ReactNode } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { TaskActionTypes } from "./taskActions";

type TaskContextProviderProps = {
  children: ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch ] = useReducer(taskReducer,initialTaskState);
  const { activeTask } = state;

  useEffect(() => {
    if (!activeTask) {
      return;
    }

    const worker = TimerWorkerManager.getInstance();

    worker.onmessage(e => {
      const countDownSeconds = e.data as number;

      if (countDownSeconds <= 0) {
        dispatch({ type: TaskActionTypes.COMPLETE_TASK });
        return;
      }

      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    });

    worker.postMessage({
      activeTask,
      secondsRemaining: activeTask.duration * 60,
    });

    return () => worker.terminate();
  }, [activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}