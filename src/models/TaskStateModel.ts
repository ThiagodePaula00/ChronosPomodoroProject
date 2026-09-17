import type { TaskModel } from "./TaskModel"

export type TaskStateModel = {
    tasks: TaskModel[]; //histórico, MainForm
    secondsRemaining: number; // Home,CountDown, histórico. MainForm, Button
    formattedSecondsRemaining: string; //Título, CountDown
    activeTask: TaskModel | null; // CountDown, histórico. MainForm, Button
    currentCycle: number; //Entre 1 e 8, Home
    config: {
        workTime: number; //MainForm
        shortBreakTime: number; //MainForm
        longBreakTime: number; //MainForm
    };
};