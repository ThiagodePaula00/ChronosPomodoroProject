import styles from './styles.module.css'

type ContainerPorProps = {
    children: React.ReactNode
}

export function Container({children}: ContainerPorProps) {
    return (
        <div className={styles.container}>
        <div className={styles.container}>{children}</div>
        </div>
    );
}