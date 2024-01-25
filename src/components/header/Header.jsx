import React from 'react'
import styles from './Header.module.css'
import Logo from '../../img/logo.png';
import StatisticsSvg from '../../img/header_statis.svg';

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo_block}>
                    <img className={styles.logo_img} src={Logo} alt="Логотип" />
                    <p className={styles.сompany_names}>pomodoro_box</p>
                </div>
                <button className={styles.statistics_btn}>
                    <img className={styles.btn_svg} src={StatisticsSvg} alt="Диаграмма" />
                    <p className={styles.btn_text}>Статистика</p>
                </button>
            </div>
        </header>
    )
}
