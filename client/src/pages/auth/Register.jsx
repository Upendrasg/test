import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../api/apiConfig';

export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const first_name = useRef();
    const last_name = useRef();
    const email = useRef();
    const password = useRef();
    const password2 = useRef();
    const walletAddress = useRef();

    async function onSubmitForm(event) {
        event.preventDefault();
        const data = {
            first_name: first_name.current.value,
            last_name: last_name.current.value,
            email: email.current.value,
            password: password.current.value,
            password2: password2.current.value,
            ethereum_wallet_address: walletAddress.current.value
        };
        setLoading(true);
        setError('');

        try {
            if (Object.values(data).some(value => value.trim() === '')) {
                setError('Please provide all details');
            } else if (data.password !== data.password2) {
                setError('Passwords do not match');
            } else {
                const response = await axiosInstance.post('auth/register', JSON.stringify(data));
                navigate('/auth/login');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const styles = {
        container: {
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
        },
        header: {
            textAlign: 'center',
            marginBottom: '20px',
            color: '#333'
        },
        form: {
            display: 'flex',
            flexDirection: 'column'
        },
        formGroup: {
            marginBottom: '15px'
        },
        formLabel: {
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
            color: '#555'
        },
        formControl: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxSizing: 'border-box'
        },
        errorMessage: {
            color: 'red',
            marginBottom: '15px',
            textAlign: 'center'
        },
        submitButton: {
            width: '100%',
            padding: '10px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s'
        },
        submitButtonDisabled: {
            backgroundColor: '#ddd',
            cursor: 'not-allowed'
        },
        submitButtonHover: {
            backgroundColor: '#218838'
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
            <h2 style={styles.header}>Register</h2>
            <form onSubmit={onSubmitForm} style={styles.form}>
                {error && <div style={styles.errorMessage}>{error}</div>}
                <div style={styles.formGroup}>
                    <label htmlFor='first_name' style={styles.formLabel}>First Name</label>
                    <input type="text" style={styles.formControl} id='first_name' ref={first_name} />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor='last_name' style={styles.formLabel}>Last Name</label>
                    <input type="text" style={styles.formControl} id='last_name' ref={last_name} />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor='email' style={styles.formLabel}>Email</label>
                    <input type="email" style={styles.formControl} id="email" ref={email} />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor='password' style={styles.formLabel}>Password</label>
                    <input type="password" style={styles.formControl} id="password" ref={password} />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor='password2' style={styles.formLabel}>Confirm Password</label>
                    <input type="password" style={styles.formControl} id="password2" ref={password2} />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor='walletAddress' style={styles.formLabel}>Wallet Address</label>
                    <input type="text" style={styles.formControl} id="walletAddress" ref={walletAddress} />
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
                        {loading ? <span style={styles.spinner}></span> : 'Register'}
                    </button>
                </div>
            </form>
        </div>
    );
}
