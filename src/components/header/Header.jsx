import React from 'react'
import styles from './Header.module.css'
import Logo from '../../img/logo.png';
import StatisticsSvg from '../../img/header_statis.svg';
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link to='/' className={styles.logo_block}>
                    <img className={styles.logo_img} src={Logo} alt="Логотип" />
                    <p className={styles.сompany_names}>pomodoro_box</p>
                </Link>
                <Link to='/statistic' className={styles.statistics_btn}>
                    <img className={styles.btn_svg} src={StatisticsSvg} alt="Диаграмма" />
                    <p className={styles.btn_text}>Статистика</p>
                </Link>
            </div>
        </header>
    )
}
