import React from 'react'

export const NotFound = () => {
    return (
        <div style={styles.notFound}>
            <h1 style={styles.heading}>404 - Та-дам! Здесь ничего нет!</h1>
            <p style={styles.paragraph}>Похоже, страница сбежала, чтобы не попасть в ваше истории просмотров.</p>
        </div>
    );
};

const styles = {
    notFound: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
    },
    heading: {
        fontSize: '3rem',
        color: '#343a40',
    },
    paragraph: {
        fontSize: '1.5rem',
        color: '#6c757d',
    },
};
