import React from 'react'
import styles from './DropDown.module.css'
import { DropDownItem } from './dropDownItems/DropDownItem'
import incSvg from '../../../../../../img/inc.svg'
import dicSvg from '../../../../../../img/dic.svg'
import redSvg from '../../../../../../img/red.svg'
import deleteSvg from '../../../../../../img/delete.svg'
import { useDispatch } from 'react-redux'
import { updateTodo } from '../../../../../../store/store'

export const DropDown = ({ handleEditClick, handleRemoveTask, task }) => {
    const dispatch = useDispatch()

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

    return (
        <div className={styles.btn_dropdown} >
            <div className={styles.dropdown_list} >
                <DropDownItem svgIcon={incSvg} text='Увеличить' onClick={() => handleCountTomato(task.id, 'plus')} />
                <DropDownItem svgIcon={dicSvg} text='Уменшить' onClick={() => handleCountTomato(task.id, 'minus')} disable={isMinusDisabled} />
                <DropDownItem svgIcon={redSvg} text='Редактировать' onClick={() => handleEditClick()} />
                <DropDownItem svgIcon={deleteSvg} text='Удалить' onClick={() => handleRemoveTask(task.id)} />
            </div>
        </div>
    )
}
