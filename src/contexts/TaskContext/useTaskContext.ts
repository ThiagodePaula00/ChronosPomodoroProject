import { useContext } from "react";
import { TaskContext } from "./TaslContext";

export function useTaskContext() {
    return useContext(TaskContext);
}