import { Box, LinearProgress, Link, Stack } from '@mui/material'
import ProfitCell from './ProfitCell'

const TodayPnLCell = ({ current_profit, budget }) => {
    return (
        <Stack sx={{ width: '100%' }} >
            <Stack direction={'row'} justifyContent={'space-between'}>
                <ProfitCell amount={current_profit} />
                <Link href='#'>Reset</Link>
            </Stack>
            <Box sx={{ width: '100%' }}>
                <LinearProgress
                    variant={'determinate'}
                    color={current_profit > 0 ? 'success' : current_profit < 0 ? 'error' : 'inherit'}
                    value={current_profit * 100 / budget}
                />
            </Box>
        </Stack>)
}

export default TodayPnLCell