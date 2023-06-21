import { Stack, Chip, Typography } from "@mui/material"
import { timeConverter } from "../../helpers"

const PlanNameCell = ({ name, status, created_at }) => {
    return (
        <Stack direction={'row'}>
            <Stack justifyContent={'center'} justifyItems={'center'}>
                <Chip size='small' label={status} />
            </Stack>
            <Stack>
                <Typography>{name}</Typography>
                <Typography>Created: {timeConverter(created_at)}</Typography>
            </Stack>
        </Stack>
    )
}

export default PlanNameCell
