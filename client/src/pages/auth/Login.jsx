import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { axiosInstance } from '../../api/apiConfig';
import useAuth from '../../hooks/useAuth';

export default function Login() {
    const { setAccessToken, setCSRFToken, setIsLoggedIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const fromLocation = location?.state?.from?.pathname || '/';
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function onEmailChange(event) {
        setEmail(event.target.value);
    }

    function onPasswordChange(event) {
        setPassword(event.target.value);
    }

    async function onSubmitForm(event) {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axiosInstance.post('auth/login', JSON.stringify({
                email,
                password
            }));

            setAccessToken(response?.data?.access_token);
            setCSRFToken(response.headers["x-csrftoken"]);
            setIsLoggedIn(true);
            setEmail('');
            setPassword('');
            setLoading(false);

            navigate('/hello_world');
            // navigate(fromLocation, { replace: true });
        } catch (error) {
            if (error.response.status === 401) {
                alert("Please provide valid credentials");
            }
            setLoading(false);
        }
    }

    const styles = {
        container: {
            maxWidth: '500px',
            margin: '0 auto',
            padding: '30px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif'
        },
        header: {
            textAlign: 'center',
            marginBottom: '20px',
            color: '#333',
            fontSize: '24px',
            fontWeight: '600'
        },
        form: {
            display: 'flex',
            flexDirection: 'column'
        },
        formGroup: {
            marginBottom: '20px'
        },
        formLabel: {
            display: 'block',
            marginBottom: '8px',
            fontWeight: 'bold',
            color: '#666',
            fontSize: '14px'
        },
        formControl: {
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            boxSizing: 'border-box',
            fontSize: '14px',
            transition: 'border-color 0.3s, box-shadow 0.3s'
        },
        errorMessage: {
            color: '#d9534f',
            marginBottom: '20px',
            textAlign: 'center',
            fontSize: '14px'
        },
        submitButton: {
            width: '100%',
            padding: '12px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s, transform 0.3s'
        },
        submitButtonDisabled: {
            backgroundColor: '#c0c0c0',
            cursor: 'not-allowed'
        },
        submitButtonHover: {
            backgroundColor: '#218838',
            transform: 'scale(1.02)'
        },
        spinner: {
            border: '4px solid rgba(0, 0, 0, 0.1)',
            borderLeftColor: 'transparent',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            animation: 'spin 1s linear infinite',
            display: 'inline-block',
            verticalAlign: 'middle'
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Login</h2>
            <form onSubmit={onSubmitForm} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor='email' style={styles.formLabel}>Email</label>
                    <input
                        type="email"
                        placeholder='Email'
                        autoComplete='off'
                        style={{ ...styles.formControl }}
                        id="email"
                        onChange={onEmailChange}
                        value={email}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor='password' style={styles.formLabel}>Password</label>
                    <input
                        type="password"
                        placeholder='Password'
                        autoComplete='off'
                        style={{ ...styles.formControl }}
                        id="password"
                        onChange={onPasswordChange}
                        value={password}
                    />
                </div>
                <div style={styles.formGroup}>
                    <button
                        disabled={loading}
                        style={{
                            ...styles.submitButton,
                            ...(loading ? styles.submitButtonDisabled : {}),
                            ...(loading ? {} : styles.submitButtonHover)
                        }}
                        type="submit"
                    >
                        {loading ? <span style={styles.spinner}></span> : 'Login'}
                    </button>
                </div>
            </form>
        </div>
    );
}
