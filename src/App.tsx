import { Heading } from './components/Heading';

import './styles/theme.css'
import './styles/global.css'

export function App() {
    console.log('Oi');

    return (
        <>
            <Heading  attr={123} attr2='string'>Olá Hipérbole 1</Heading>
            <Heading>Olá Hipérbole 2</Heading>
            <Heading>Olá Hipérbole 3</Heading>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero totam quisquam veniam inventore delectus perferendis, animi molestias omnis mollitia corrupti cum veritatis eum culpa sunt nostrum doloribus repellat eaque minima.
            </p>
        </>
    )
}