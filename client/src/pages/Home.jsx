import React, { useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import useUser from '../hooks/useUser'

export default function Home() {
    const { user } = useAuth();
    const getUser = useUser()

    useEffect(() => {
        getUser()
    }, [])

    // Inline styles
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
            backgroundColor: '#f8f9fa',
            padding: '20px',
        },
        card: {
            width: '18rem',
            background: 'linear-gradient(to right, #ffffff, #e9ecef)',
            borderRadius: '12px',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            textAlign: 'center',
            border: '1px solid #dee2e6',
        },
        cardTitle: {
            fontSize: '24px',
            marginBottom: '15px',
            color: '#343a40',
        },
        cardText: {
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#007bff',
            margin: '10px 0',
        },
        message: {
            fontSize: '18px',
            color: '#495057',
            textAlign: 'center',
            marginTop: '20px',
        },
    }

    return (
        <div style={styles.container}>
            {user?.email !== undefined ? typeof (user?.balance) === "string" ? (
                <div style={styles.message}>Please login first</div>
            ) : (
                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>Wallet Balance</h3>
                    <hr />
                    <h5 style={styles.cardText}>$ {user?.balance.toFixed(3)}</h5>
                </div>
            ) : (
                <div style={styles.message}>Please login first</div>
            )}
        </div>
    )
}
