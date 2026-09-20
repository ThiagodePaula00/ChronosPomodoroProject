import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';


import styles from './styles.module.css';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../components/utils/formatDate';
import { getTaskStatus } from '../../components/utils/getTaskStatus';
import { sortTasks, type SortTasksOptions } from '../../components/utils/sortTasks';
import { useMemo, useState } from 'react';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { toast } from 'react-toastify';

export function History() {
    const { state, dispatch } = useTaskContext();
    const hasTasks = state.tasks.length > 0;

    const [sortedTasksOptions, setSortTaskOptions] = useState<Pick<SortTasksOptions<(typeof state.tasks)[number]>, 'field' | 'direction'>>({
      field: 'startDate',
      direction: 'desc',
    });

    const sortedTasks = useMemo(
      () => sortTasks({
        tasks: state.tasks,
        direction: sortedTasksOptions.direction,
        field: sortedTasksOptions.field,
      }),
      [state.tasks, sortedTasksOptions.direction, sortedTasksOptions.field],
    );

    function handleSortTasks({ field }: Pick<SortTasksOptions<(typeof state.tasks)[number]>, 'field'>) {
      const newDirection = sortedTasksOptions.direction === 'desc' ? 'asc' : 'desc';

      setSortTaskOptions((prevState) => ({
        ...prevState,
        direction: newDirection,
        field,
      }));
    }

  function handleDeleteAllHistory() {
    toast.dismiss();
    toast('grterg', {
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
    });

      if(!confirm('Tem certeza?')) return
      dispatch({ type: TaskActionTypes.RESET_STATE});
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          {hasTasks && (
          <span className={styles.buttonContainer}>
            <DefaultButton
              icon={<TrashIcon />}
              color='red'
              aria-label='Apagar todo o histórico'
              title='Apagar histórico'
              onClick={handleDeleteAllHistory}
            />
          </span>
          )}
        </Heading>
      </Container>

      <Container>
        <div className={styles.responsiveTable}>
          <table>
            <thead>
              <tr>
                <th
                  onClick={() => handleSortTasks({ field: 'name' })}
                  className={styles.thSort}
                >
                  Tarefa ↕
                </th>
                <th
                  onClick={() => handleSortTasks({ field: 'duration' })}
                  className={styles.thSort}
                >
                  Duração ↕
                </th>
                <th
                  onClick={() => handleSortTasks({ field: 'startDate' })}
                  className={styles.thSort}
                >
                  Data ↕
                </th>
                <th>Status</th>
                <th>Tipo</th>
              </tr>
            </thead>

            <tbody>
              {sortedTasks.map((task) => {
                const taskTypeDictionary = {
                    workTime: 'Foco',
                    shortBreakTime: 'Descanso curto',
                    longBreakTime: 'Descanso longo'
                };

                return (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.duration}min</td>
                    <td>{formatDate(task.startDate)}</td>
                    <td>{getTaskStatus(task, state.activeTask!)}</td>
                    <td>{taskTypeDictionary[task.type]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      {!hasTasks && (<p style={{ textAlign: 'center' }}>Ainda não existem tarefas criadas</p>)}
      </Container> 
    </MainTemplate>
  );
}
