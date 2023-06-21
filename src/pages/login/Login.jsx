import React from 'react'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Container, Grid, TextField, Typography, Button } from '@mui/material'
import PasswordField from '../../components/input/PasswordField'
const Login = () => {
    const { onLogin } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <Container>
            <Grid
                container
                direction='column'
                justifyContent='center'
                alignItems='center'
                style={{
                    height: '100vh'
                }}
            >
                <Grid item>
                    <Grid container direction='column' spacing={2}>
                        <Grid item>
                            <Typography variant='h4'>
                                Login to your account
                            </Typography>
                        </Grid>
                        <Grid item>
                            <TextField
                                fullWidth size='small'
                                placeholder='Email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <PasswordField
                                fullWidth
                                size='small'
                                name='password'
                                placeholder='Password'
                                onChange={setPassword}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => onLogin({ email, password })}
                            >Login</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Login
