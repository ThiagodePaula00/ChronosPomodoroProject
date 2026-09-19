import { useEffect, useReducer, useRef, type ReactNode } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { TaskActionTypes } from "./taskActions";
import { loadBeep } from "../../components/utils/loadBeep";

type TaskContextProviderProps = {
  children: ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch ] = useReducer(taskReducer,initialTaskState);
  const { activeTask } = state;

  const playBeepRef = useRef<() => void | null >(null);

  useEffect(() => {
    if (activeTask) {
      document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;
    }
  }, [activeTask, state.formattedSecondsRemaining]);

  useEffect(() => {
    if (!activeTask) {
      return;
    }

    const worker = TimerWorkerManager.getInstance();

    worker.onmessage(e => {
      const countDownSeconds = e.data as number;

      if (countDownSeconds <= 0) {
        if(playBeepRef.current) {
          playBeepRef.current();
          playBeepRef.current = null;
        }

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

  useEffect(() => {
      if (state.activeTask && playBeepRef.current === null) {
        playBeepRef.current = loadBeep();
      } else {
          playBeepRef.current = null;
      }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}