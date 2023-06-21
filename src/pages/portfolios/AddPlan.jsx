import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, InputAdornment, MenuItem, OutlinedInput, Select, Snackbar, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'

const initPlan = {
    name: '',
    account_type: 'DEMO',
    bugdet: 0,
    take_profit: 0,
    stop_loss: 0,
    base_amount: 0,
    bot_ai_id: 1,
    budget_id: 1,
}
const AddPlan = ({ open, closeDialog }) => {
    const [plan, setPlan] = useState(initPlan)
    const [activeStep, setActiveStep] = useState(1)
    const [openSnack, setOpenSnack] = useState(false)
    const handleChange = (field, e) => {
        if (field === 'tp_stl') {
            const [tp, stl] = e.target.value.split('/')
            setPlan({ ...plan, take_profit: tp || 0, stop_loss: stl || 0 })
        } else {
            const value = e.target.value
            setPlan({ ...plan, [field]: value })
        }
    }
    const nextStep = () => {
        if (activeStep > 2) return
        setActiveStep(activeStep + 1)
    }
    const backStep = () => {
        if (activeStep < 2) return
        setActiveStep(activeStep - 1)
    }
    const confirmAndSubmit = () => {
        setActiveStep(1)
        axios.post(process.env.REACT_APP_PLAN_API, plan)
            .then(({ status }) => {
                if (status === 201) {
                    closeDialog()
                    setPlan(initPlan)
                    setOpenSnack(true)
                    setTimeout(() => setOpenSnack(false), 3000)
                }
                else {
                    throw new Error('failed')
                }
            })
    }
    return (
        <>
            <Dialog
                open={open}
                onClose={closeDialog}
                maxWidth='md'

            >
                <DialogTitle>Create your plan</DialogTitle>
                <DialogContent>
                    {activeStep === 1 && <Box
                        sx={{ width: 600, height: 350 }}
                    >
                        <Grid container justifyItems={'center'} justifyContent={'center'}>
                            <Grid container width={'80%'}>
                                <Grid item sm={12}>
                                    <Typography variant='h5'>
                                        Step 1: Setup your fund
                                    </Typography>
                                    <Typography variant='subtitle1'>
                                        View and update your account details, profile, and more.
                                    </Typography>
                                </Grid>
                                <Grid item sm={12}>
                                    <Grid container spacing={2}>
                                        <Grid item sm={12} md={6}>
                                            <Typography>
                                                1. Investment Plan
                                            </Typography>
                                            <TextField
                                                onChange={(e) => handleChange('name', e)}
                                                value={plan['name']}
                                                fullWidth
                                                size='small' />
                                        </Grid>
                                        <Grid item sm={12} md={6}>
                                            <Typography>
                                                2. Account Type
                                            </Typography>
                                            <Select
                                                onChange={(e) => handleChange('account_type', e)}
                                                fullWidth
                                                value={plan['account_type']}
                                                size='small'
                                            >
                                                <MenuItem value={'LIVE'}>Live Account</MenuItem>
                                                <MenuItem value={'DEMO'}>Demo Account</MenuItem>
                                            </Select>
                                        </Grid>
                                        <Grid item sm={12} md={6}>
                                            <Typography>
                                                3. Allocate budget
                                            </Typography>
                                            <OutlinedInput
                                                onChange={(e) => handleChange('bugdet', e)}
                                                value={plan['bugdet']}
                                                fullWidth
                                                size='small'
                                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            />
                                        </Grid>
                                        <Grid item sm={12} md={6}>
                                            <Typography>
                                                4. Take Profit/Stoploss
                                            </Typography>
                                            <TextField
                                                placeholder='xx/xx'
                                                onChange={(e) => handleChange('tp_stl', e)}
                                                defaultValue={`${plan['take_profit']}/${plan['stop_loss']}`}
                                                fullWidth size='small' />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>}
                    {activeStep === 2 && <Box
                        sx={{
                            width: 600,
                            height: 350,
                        }}
                    >
                        <Grid container justifyItems={'center'} justifyContent={'center'}>
                            <Grid container width={'80%'}>
                                <Grid item sm={12}>
                                    <Typography variant='h5'>
                                        Step 2: Setup your strategy
                                    </Typography>
                                    <Typography variant='subtitle1'>
                                        View and update your account details, profile, and more.
                                    </Typography>
                                </Grid>
                                <Grid item sm={12}>
                                    <Grid container spacing={2}>
                                        <Grid item sm={12} md={12}>
                                            <Typography>
                                                5. Choose Bot AI
                                            </Typography>
                                            <Select
                                                onChange={(e) => handleChange('bot_ai_id', e)}
                                                value={plan['bot_ai_id']}
                                                size='small'
                                                fullWidth
                                            >
                                                <MenuItem value={1}>Superman Bot</MenuItem>
                                                <MenuItem value={2}>Spiderman Bot</MenuItem>
                                            </Select>
                                        </Grid>
                                        <Grid item sm={12} md={6}>
                                            <Typography>
                                                6. Choose budget strategy
                                            </Typography>
                                            <Select
                                                onChange={(e) => handleChange('budget_id', e)}
                                                value={plan['budget_id']}
                                                size='small' fullWidth>
                                                <MenuItem value={1}>QLV1</MenuItem>
                                                <MenuItem value={2}>QLV2</MenuItem>
                                            </Select>

                                        </Grid>
                                        <Grid item sm={12} md={6}>
                                            <Typography>
                                                7. Set base amount
                                            </Typography>
                                            <OutlinedInput
                                                onChange={(e) => handleChange('base_amount', e)}
                                                value={plan['base_amount']}
                                                fullWidth
                                                size='small'
                                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>}
                    {activeStep === 3 && <Box
                        sx={{
                            width: 600,
                            height: 400,
                        }}
                    >
                        <Grid container justifyItems={'center'} justifyContent={'center'}>
                            <Grid container width={'80%'}>
                                <Grid item sm={12}>
                                    <Typography variant='h5'>
                                        Step 3: View and confirm you plan
                                    </Typography>
                                    <Typography variant='subtitle1'>
                                        View and update your account details, profile, and more.
                                    </Typography>
                                </Grid>
                                <Grid item sm={12}>
                                    <Grid>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                height: 100,
                                                background: 'linear-gradient(100.6deg, #009D8A 2.15%, #000513 96.19%)',
                                                borderRadius: 2
                                            }}
                                        >
                                            <Typography color={'white'}>My plan</Typography>
                                            <Divider></Divider>
                                            <Stack justifyContent={'center'} justifyItems={'center'}>
                                                <Typography width={'50%'}>${plan['bugdet']}</Typography>
                                                <Typography width={'50%'}>Alocated Budget</Typography>
                                            </Stack>
                                        </Box>
                                        <Stack spacing={1}>
                                            <Stack direction={'row'} justifyContent={'space-between'}>
                                                <Typography>Account Type</Typography>
                                                <Typography>{plan['account_type']}</Typography>
                                            </Stack>
                                            <Stack direction={'row'} justifyContent={'space-between'}>
                                                <Typography>Take Profit/Stoploss</Typography>
                                                <Typography>{`$${plan['take_profit']}/$${plan['take_profit']}`}</Typography>
                                            </Stack>
                                            <Divider />
                                            <Stack direction={'row'} justifyContent={'space-between'}>
                                                <Typography>Budget Strategy</Typography>
                                                <Typography>{plan['budget_id'] === 1 ? 'QLV1' : 'QLV2'}</Typography>
                                            </Stack>
                                            <Stack direction={'row'} justifyContent={'space-between'}>
                                                <Typography>Bot Name</Typography>
                                                <Typography>{plan['bot_ai_id'] === 1 ? 'Superman Bot' : 'Spiderman Bot'}</Typography>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>}
                </DialogContent>
                <DialogActions>
                    {activeStep !== 1 &&
                        <Button color='primary' variant='outlined' onClick={backStep}>Back</Button>
                    }
                    {activeStep < 3 &&
                        <Button color='success' variant='contained' onClick={nextStep}>Next</Button>
                    }
                    {activeStep === 3 &&
                        <Button color='success' variant='contained' onClick={confirmAndSubmit}>Confirm & Save</Button>
                    }
                </DialogActions>
            </Dialog>
            <Snackbar
                open={openSnack}
                severity="success"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <Alert severity="success" sx={{ width: '100%' }}>Created Successful</Alert>
            </Snackbar>
        </>
    )
}

export default AddPlan
