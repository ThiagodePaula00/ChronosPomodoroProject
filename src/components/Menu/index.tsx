import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon,} from 'lucide-react';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';

type AvailableThemes = 'dark' | 'light'

export function Menu() {
    const [theme, setTheme ] = useState<AvailableThemes>('dark');

  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    event.preventDefault();

    setTheme((prevTheme) => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    });
  }

  useEffect(() => {
    console.log('theme mudou', theme, Date.now());

    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

         // useEffect(() => {
  //   console.log('useEffect sem dependências', Date.now());
  // }); // Executado todas vez que o componente renderiza na tela

  // useEffect(() => {
  //   console.log('useEffect com array deps vazio', Date.now());
  // }, []); // Executa apenas quando o React monta o componente na tela pela primeira vez

    return (
        <nav className={styles.menu}>
            <a className={styles.menuLink} href="#" aria-label='Ir para a Home' title='Ir para home'>
                <HouseIcon/>
            </a>

            <a className={styles.menuLink} href="#" aria-label='Ver histórico' title='Ver histórico'>
                <HistoryIcon/>
            </a>

            <a className={styles.menuLink} href="#" aria-label='Configurações' title='Configurações'>
                <SettingsIcon/>
            </a>
            
            <a className={styles.menuLink} href="#"aria-label='Mudar tema' title='Mudar tema'
            onClick={handleThemeChange}>
                <SunIcon/>
            </a>
        </nav>
    );
}