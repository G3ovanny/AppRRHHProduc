import { Skeleton } from '@mui/material'
import React from 'react'

export const TableSkeleton = () => {
    return (
        <>
            <Skeleton
                variant="rectangular"
                width={1630} height={600}
            />
        </>
    )
}
