import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './ToDoItem.module.css'
import btnItem from '../../../../../img/btn-item.svg'
import { DeleteItem } from './deleteItem/DeleteItem'
import { useDispatch } from 'react-redux'
import { updateTodo } from '../../../../../store/store'
import { DropDown } from './dropDown/DropDown'

export const ToDoItem = ({ task, id, handleRemoveTask, handleClickTaskItem, isOpenDeleted, setIsOpenDeleted }) => {
    const dispatch = useDispatch()
    const ref = useRef(null);
    const [dropDownOpen, setDropDownOpen] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [editedValue, setEditedValue] = useState(task.value);

    const [inputStyle, setInputStyle] = useState({});

    const handleEditClick = () => {
        setInputStyle({ backgroundColor: 'rgb(203, 226, 226)' });
        setIsEditing(true);
    };

    const toggleDropDown = () => {
        setDropDownOpen((prevState) => !prevState);
    };

    const handleClickOutside = useCallback((event) => {
        if (ref.current && ref.current.contains && !ref.current.contains(event.target)) {
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
                        style={inputStyle}
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
                    <DropDown handleEditClick={handleEditClick} handleRemoveTask={handleRemoveTask} task={task} />
                )}

                {isOpenDeleted && (
                    <DeleteItem id={task.id} setIsOpenDeleted={setIsOpenDeleted} />
                )}
            </div>
        </li>
    )
}
