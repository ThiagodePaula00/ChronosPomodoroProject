import { PlayCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import type { HomeProps } from "../../pages/Home";

export function MainForm({ state }: HomeProps) {
    
    return (
        <form className='form' action="">

        <div className="formRow">
            <DefaultInput labelText='Task' id='meuInput' type='text' title='Título' placeholder='Digite algo'/>
        </div>

        <div className="formRow">
            <p>Próximo intervalo é de {state.config.workTime}</p>
        </div>

        <div className="formRow">
            <Cycles />
        </div>

        <div className="formRow">
            <DefaultButton icon={ <PlayCircleIcon />} />
        </div>
        </form>
    )
}