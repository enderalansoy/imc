import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'

const DataCard = ({title, content}: { title: string, content: React.ReactFragment }): JSX.Element =>
  <Card>
    <CardContent>
      <Typography variant="h5" style={{ marginBottom: 10 }}>
        {title}
      </Typography>
      <div>{content}</div>
    </CardContent>
  </Card>

export default DataCard
