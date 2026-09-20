import { SaveIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { DefaultInput } from '../../components/DefaultInput';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { showMessage } from '../../adapters/showMessage';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';


export function Settings() {
    const { state, dispatch } = useTaskContext();
    const workTimeInputRef = useRef<HTMLInputElement>(null);
    const shortBreakTimeInputRef = useRef<HTMLInputElement>(null);
    const longBreakTimeInputRef = useRef<HTMLInputElement>(null);

    function handleSaveSettings(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        showMessage.dismiss();

        const formErrors: string[] = [];

        const workTime = Number(workTimeInputRef.current?.value);
        const shortBreakTime = Number(shortBreakTimeInputRef.current?.value);
        const longBreakTime = Number(longBreakTimeInputRef.current?.value);

        if(isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
            formErrors.push('Digite apenas números para todos os campos')
        }

        if(workTime < 1 || workTime > 99) {
            formErrors.push('Digite apenas valores entre 1 e 99 para foco')

        }

        if(shortBreakTime < 1 || shortBreakTime > 30) {
            formErrors.push('Digite apenas valores entre 1 e 30 para descanso curto')

        }

        if(longBreakTime < 1 || longBreakTime > 60) {
            formErrors.push('Digite apenas valores entre 1 e 60 para descanso longo')

        }

        if(formErrors.length > 0) {
            formErrors.forEach(error => {
                showMessage.error(error);
            });
            return;
        }

        dispatch({type: TaskActionTypes.CHANGE_SETTINGS, 
            payload: {
                workTime,
                shortBreakTime,
                longBreakTime,
        },
    });
        showMessage.sucess('Configurações salvas');
    }

  return (
        <MainTemplate>
            <Container>
                <Heading>
                    Configurações
                </Heading>
            </Container>
            <Container>
                <p style={{ textAlign: 'center' }}>
                    Modifique as configurações para tempo de foco, descanso curto e descanso longo
                </p>
            </Container>

            <Container>
                <form  onSubmit={handleSaveSettings} action="" className="form">
                    <div className="formRow">
                        <DefaultInput 
                        id='workTime' 
                        labelText='Foco' 
                        ref={workTimeInputRef} 
                        defaultValue={state.config.workTime} 
                        type='number'
                        />

                    </div>
                    <div className="formRow">
                        <DefaultInput 
                        id='shortBreakTime' 
                        labelText='Descanso curto' 
                        ref={shortBreakTimeInputRef} 
                        defaultValue={state.config.shortBreakTime} 
                        type='number' 
                        />

                    </div>
                    <div className="formRow">
                        <DefaultInput 
                        id='longBreakTime' 
                        labelText='Descanso longo'
                        ref={longBreakTimeInputRef} 
                        defaultValue={state.config.longBreakTime} 
                        type='number' 
                        />

                    </div>
                    <div className="formRow">
                        <DefaultButton 
                        icon={<SaveIcon/>} 
                        aria-label='Salvar configurações' 
                        title='Salvar configurações' />

                    </div>
                </form>
            </Container>
        </MainTemplate>
    );
}