import { Skeleton } from '@mui/material'
import React from 'react'

const OrderSkeleton = () => {
  return (
    <>
        <Skeleton variant="rectangular" width='80%' height={60} />
        <Skeleton variant="rectangular" width='80%' height={60} />
        <Skeleton variant="rectangular" width='80%' height={60} />
    </>
  )
}

export default OrderSkeleton