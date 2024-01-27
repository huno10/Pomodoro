import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './ToDoItem.module.css'
import btnItem from '../../../../../img/btn-item.svg'
import incSvg from '../../../../../img/inc.svg'
import dicSvg from '../../../../../img/dic.svg'
import redSvg from '../../../../../img/red.svg'
import deleteSvg from '../../../../../img/delete.svg'

export const ToDoItem = ({ task, index, handleRemoveTask }) => {
    const ref = useRef(null);
    const [dropDownOpen, setDropDownOpen] = useState(false)

    const toggleDropDown = () => {
        setDropDownOpen((prevState) => !prevState);
    };

    const handleClickOutside = useCallback((event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            const isButtonClick = event.target.classList.contains(styles.btn) ||
                event.target.closest(`.${styles.btn_dropdown}`) ||
                event.target.closest(`.${styles.dropdown_list}`);

            if (!isButtonClick) {
                setDropDownOpen(false);
            }
        }
    }, [dropDownOpen, ref]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <li className={styles.item}>
            <div className={styles.item_block}>
                <span className={styles.index}>{index + 1}</span>
                <h3 className={styles.title}>{task.value}</h3>
            </div>
            <div ref={ref} className={styles.dropDown_wrapper}>
                <button className={styles.btn} type='button' onClick={toggleDropDown} >
                    <img src={btnItem} />
                </button>
                {dropDownOpen && (
                    <div className={styles.btn_dropdown} >
                        <div className={styles.dropdown_list} >
                            <button type='button' className={styles.dropdown_item}>
                                <img className={styles.dropdown_img} src={incSvg} alt="" />
                                <span className={styles.dropdown_span}>Увеличить</span>
                            </button>
                            <button type='button' className={styles.dropdown_item}>
                                <img className={styles.dropdown_img} src={dicSvg} alt="" />
                                <span className={styles.dropdown_span}>Уменшить</span>
                            </button>
                            <button type='button' className={styles.dropdown_item}>
                                <img className={styles.dropdown_img} src={redSvg} alt="" />
                                <span className={styles.dropdown_span}>Редактировать</span>
                            </button>
                            <button type='button' className={styles.dropdown_item} onClick={() => handleRemoveTask(task.id)}>
                                <img className={styles.dropdown_img} src={deleteSvg} alt="" />
                                <span className={styles.dropdown_span}>Удалить</span>
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </li>
    )
}
