import React from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const MenuBar = (): JSX.Element =>
  <AppBar position="static">
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" color="inherit" component="div">
        IMC Data
      </Typography>
    </Toolbar>
  </AppBar>

export default MenuBar
