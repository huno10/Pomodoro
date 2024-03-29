import React from 'react'
import styles from './DropDownItem.module.css'

export const DropDownItem = ({ svgIcon, text, onClick, disable }) => {
    return (
        <button type='button' className={styles.dropdown_item} onClick={onClick} disabled={disable ? disable : false}>
            <img className={styles.dropdown_img} src={svgIcon} alt={text} />
            <span className={styles.dropdown_span}>{text}</span>
        </button>
    )
}
