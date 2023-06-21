import { Button, Menu, MenuItem, Stack, Switch } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import PlanNameCell from '../../components/data-grid/PlanNameCell'
import ProfitCell from '../../components/data-grid/ProfitCell'
import TodayPnLCell from '../../components/data-grid/TodayPnLCell'

const BasicMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                size='small'
                variant='outlined'
            >
                ...
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>
    );

}

const ActionsCell = ({ name }) => {
    return (
        <>
            <Stack direction={'row'}>
                <Switch
                    size='small'
                    onClick={(e) => {
                        alert(`You just turn ${e.target.checked ? 'on' : 'off'} ${name}`)
                    }}
                />
                <BasicMenu />
            </Stack>
        </>
    )
}

const PlanList = ({ list, limit, setLimit, page, setPage, loading }) => {
    const columns = [
        {
            field: 'name',
            headerName: 'Plan Name',
            flex: 2,
            renderCell: (params) => <PlanNameCell {...params.row} />
        },
        {
            field: 'budget',
            headerName: 'Invested',
            flex: 1,
            renderCell: ({ value }) => <ProfitCell amount={value} />
        },
        {
            field: 'profit',
            headerName: 'PnL',
            flex: 1,
            renderCell: ({ value }) => <ProfitCell amount={value} />
        },
        {
            field: 'current_profit',
            headerName: 'Today PnS',
            flex: 1,
            renderCell: (params) => <TodayPnLCell {...params.row} />
        },
        {
            field: '',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => <ActionsCell {...params.row} />
        }
    ]
    return (
        <DataGrid
            columns={columns}
            rows={list}
            paginationMode='server'
            rowCount={100}
            loading={loading}
            rowSelection={false}
            paginationModel={{ pageSize: limit, page: page - 1 }}
            onPaginationModelChange={(newPageSize) => {
                setLimit(newPageSize.pageSize)
                setPage(newPageSize.page + 1)
            }}
            pageSizeOptions={[5, 10, 25]}
        />
    )
}

export default PlanList
