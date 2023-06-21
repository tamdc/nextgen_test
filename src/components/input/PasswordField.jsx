import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material"

import { useState } from 'react'
const PasswordField = ({ onChange, ...rest }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [value, setValue] = useState('')
    const handleChange = (e) => {
        setValue(e.target.value)
        onChange(e.target.name, e.target.value)
    }
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <OutlinedInput
            type={showPassword ? 'text' : 'password'}
            value={value}
            onChange={handleChange}
            {...rest}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            }
        />
    )
}

export default PasswordField
