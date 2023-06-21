import { Typography } from "@mui/material"
import { formatter } from "../../helpers"

const ProfitCell = ({ amount }) =>
    <Typography color={amount > 0 ? '#0CAF60' : (amount < 0 ? '#FD6A6A' : '#111827')}>
        {formatter(amount)}
    </Typography>

export default ProfitCell
