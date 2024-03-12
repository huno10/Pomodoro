import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './ToDoItem.module.css'
import btnItem from '../../../../../img/btn-item.svg'
import incSvg from '../../../../../img/inc.svg'
import dicSvg from '../../../../../img/dic.svg'
import redSvg from '../../../../../img/red.svg'
import deleteSvg from '../../../../../img/delete.svg'
import { DeleteItem } from './deleteItem/DeleteItem'
import { useDispatch } from 'react-redux'
import { updateTodo } from '../../../../../store/store'

export const ToDoItem = ({ task, id, handleRemoveTask, handleClickTaskItem, isOpenDeleted, setIsOpenDeleted }) => {
    const dispatch = useDispatch()
    const ref = useRef(null);
    const [dropDownOpen, setDropDownOpen] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [editedValue, setEditedValue] = useState(task.value);

    const isMinusDisabled = task.tomato === 1;

    const handleCountTomato = (id, operation) => {
        let tomato;
        switch (operation) {
            case 'plus':
                tomato = task.tomato + 1;
                break;
            case 'minus':
                tomato = task.tomato - 1;
                break;
        }

        dispatch(updateTodo({ id, updates: { tomato: tomato } }))
    };

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
        <li className={styles.item} onClick={() => handleClickTaskItem(task.id)}>
            <div className={styles.item_block} >
                <span className={styles.count_pomodor}>{task.tomato}</span>
                {isEditing ? (
                    <input className={styles.editedInput}
                        type="text"
                        value={editedValue}
                        onChange={(e) => { setEditedValue(e.target.value); }}
                        onBlur={() => { dispatch(updateTodo({ id, updates: { value: editedValue } })); setIsEditing(false) }}
                    />
                ) : (
                    <div className={styles.title}>{task.value}</div>
                )}
            </div>
            <div ref={ref} className={styles.dropDown_wrapper}>
                <button className={styles.btn} type='button' onClick={toggleDropDown} >
                    <img src={btnItem} />
                </button>
                {dropDownOpen && (
                    <div className={styles.btn_dropdown} >
                        <div className={styles.dropdown_list} >
                            <button type='button' className={styles.dropdown_item} onClick={() => handleCountTomato(task.id, 'plus')}>
                                <img className={styles.dropdown_img} src={incSvg} alt="увеличить" />
                                <span className={styles.dropdown_span}>Увеличить</span>
                            </button>
                            <button type='button' className={styles.dropdown_item} onClick={() => handleCountTomato(task.id, 'minus')} disabled={isMinusDisabled}>
                                <img className={styles.dropdown_img} src={dicSvg} alt="уменшить" />
                                <span className={styles.dropdown_span}>Уменшить</span>
                            </button>
                            <button type='button' className={styles.dropdown_item} onClick={() => { setIsEditing(true) }}>
                                <img className={styles.dropdown_img} src={redSvg} alt="редактировать" />
                                <span className={styles.dropdown_span}>Редактировать</span>
                            </button>
                            <button type='button' className={styles.dropdown_item} onClick={() => handleRemoveTask(task.id)}>
                                <img className={styles.dropdown_img} src={deleteSvg} alt="удалить" />
                                <span className={styles.dropdown_span}>Удалить</span>
                            </button>
                        </div>
                    </div>
                )}

                {isOpenDeleted && (
                    <DeleteItem id={task.id} setIsOpenDeleted={setIsOpenDeleted} />
                )}

            </div>
        </li>
    )
}
