import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import useAuth from '../../hooks/useAuth'
import useLogout from "../../hooks/useLogout"
import useUser from '../../hooks/useUser'

export default function User() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const logout = useLogout()
    const [loading, setLoading] = useState(false)
    const getUser = useUser()

    useEffect(() => {
        getUser()
    }, [])

    async function onLogout() {
        setLoading(true)
        await logout()
        navigate('/')
    }

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#e9ecef',
            padding: '20px',
        },
        card: {
            background: 'linear-gradient(to right, #ffffff, #f8f9fa)',
            borderRadius: '12px',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
            padding: '30px',
            maxWidth: '600px',
            width: '100%',
            textAlign: 'center',
            margin: '20px',
            border: '1px solid #dee2e6',
        },
        title: {
            fontSize: '28px',
            marginBottom: '20px',
            color: '#343a40',
        },
        info: {
            marginBottom: '20px',
            textAlign: 'left',
        },
        detail: {
            fontSize: '18px',
            marginBottom: '12px',
        },
        detailLabel: {
            fontWeight: 'bold',
            color: '#495057',
        },
        button: {
            display: 'inline-block',
            width: '100%',
            padding: '12px 20px',
            fontSize: '18px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: '#007bff',
            color: '#ffffff',
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.3s',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        },
        buttonDisabled: {
            backgroundColor: '#6c757d',
            cursor: 'not-allowed',
            boxShadow: 'none',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
            transform: 'scale(1.05)',
        },
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>User Profile</h2>
                <div style={styles.info}>
                    <div style={styles.detail}>
                        <span style={styles.detailLabel}>ID:</span> {user?.id}
                    </div>
                    <div style={styles.detail}>
                        <span style={styles.detailLabel}>Username:</span> {user?.username}
                    </div>
                    <div style={styles.detail}>
                        <span style={styles.detailLabel}>Email:</span> {user?.email}
                    </div>
                    <div style={styles.detail}>
                        <span style={styles.detailLabel}>First Name:</span> {user?.first_name}
                    </div>
                    <div style={styles.detail}>
                        <span style={styles.detailLabel}>Last Name:</span> {user?.last_name}
                    </div>
                    <div style={styles.detail}>
                        <span style={styles.detailLabel}>Staff Status:</span> {user?.is_staff ? 'Yes' : 'No'}
                    </div>
                </div>
                <button 
                    style={{
                        ...styles.button,
                        ...(loading ? styles.buttonDisabled : {}),
                        ...(loading ? {} : styles.buttonHover),
                    }}
                    onClick={onLogout}
                    disabled={loading}
                >
                    {loading ? 'Logging out...' : 'Logout'}
                </button>
            </div>
        </div>
    )
}
