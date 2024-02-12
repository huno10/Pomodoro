import React from 'react'
import styles from './DeleteItem.module.css'
import { useDispatch } from 'react-redux';
import { removeTodo } from '../../../../../../store/store';

export const DeleteItem = ({ id, setIsOpenDeleted }) => {
    const dispatch = useDispatch()

    const handleRemoveTask = (id) => {
        if (id) {
            dispatch(removeTodo({ id }));
        }
        setIsOpenDeleted(false)
    };

    const handleCancelWindow = () => {
        setIsOpenDeleted(false)
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                <h2 className={styles.title}>Удалить задачу?</h2>
                <div className={styles.modal_buttons}>
                    <button className={styles.delete_btn} onClick={() => handleRemoveTask(id)}>
                        Удалить
                    </button>
                    <button className={styles.cancel_btn} onClick={() => handleCancelWindow()}>
                        Отмена
                    </button>
                </div>
                <svg className={styles.cancel_svg} onClick={() => handleCancelWindow()}
                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9115 13.8058L6.84406 18.9567L4.96166 17.0433L10.0291 11.8924L5.0675 6.84914L6.85992 5.02721L11.8215 10.0705L16.7673 5.04334L18.6497 6.95672L13.7039 11.9839L18.6655 17.0272L16.8731 18.8491L11.9115 13.8058Z" fill="#C4C4C4" />
                </svg>
            </div>
        </div>
    )
}
