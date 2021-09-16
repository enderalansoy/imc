import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'

const DataCard = (props: { title: string, content: React.ReactFragment }) =>
  <Card>
    <CardContent>
      <Typography variant="h5" style={{ marginBottom: 10 }}>
        {props.title}
      </Typography>
      <div>{props.content}</div>
    </CardContent>
  </Card>

export default DataCard
