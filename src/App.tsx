import { Heading } from './components/Heading';

import './styles/theme.css'
import './styles/global.css'
import { TimerIcon } from 'lucide-react';

export function App() {

    return (
        <>
            <Heading>
                Olá Mundo 1
                <button>
                    <TimerIcon/>
                </button>
            </Heading>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero totam quisquam veniam inventore delectus perferendis, animi molestias omnis mollitia corrupti cum veritatis eum culpa sunt nostrum doloribus repellat eaque minima.
            </p>
        </>
    )
}