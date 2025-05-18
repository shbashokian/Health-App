// Main Dashboard page

import React, { useState } from "react";
import { Box, Drawer, AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText, Typography, CssBaseline, IconButton, Divider, Grid, Card, CardActionArea, CardContent, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MoodIcon from "@mui/icons-material/Mood";
import OpacityIcon from "@mui/icons-material/Opacity";
import AirIcon from "@mui/icons-material/Air";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HotelIcon from "@mui/icons-material/Hotel";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import PsychologyIcon from "@mui/icons-material/Psychology";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Import all components
import MoodTracker from "../components/MoodTracker";
import WaterTracker from "../components/WaterTracker";
import BreathingAnimation from "../components/BreathingAnimation";
import MealLog from "../components/MealLog";
import SleepTracker from "../components/SleepTracker";
import FitnessChecklist from "../components/FitnessChecklist";
import StretchSequence from "../components/StretchSequence";
import MentalHealthJournal from "../components/MentalHealthJournal";
import WeightTracker from "../components/WeightTracker";
import HealthDashboard from "../components/HealthDashboard";

const drawerWidth = 240;

const Main = styled("main")(({ theme, open }) => ({
  flexGrow: 1,
  padding: 0,
  marginLeft: open ? drawerWidth : 0,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const componentsList = [
  {
    key: "dashboard",
    label: "Health Dashboard",
    icon: <DashboardIcon color="primary" />,
    component: <HealthDashboard />,
  },
  {
    key: "mood",
    label: "Mood Tracker",
    icon: <MoodIcon color="secondary" />,
    component: <MoodTracker />,
  },
  {
    key: "water",
    label: "Water Tracker",
    icon: <OpacityIcon color="info" />,
    component: <WaterTracker />,
  },
  {
    key: "breathing",
    label: "Breathing Animation",
    icon: <AirIcon color="success" />,
    component: <BreathingAnimation />,
  },
  {
    key: "meal",
    label: "Meal Log",
    icon: <RestaurantIcon color="warning" />,
    component: <MealLog />,
  },
  {
    key: "sleep",
    label: "Sleep Tracker",
    icon: <HotelIcon color="primary" />,
    component: <SleepTracker />,
  },
  {
    key: "fitness",
    label: "Fitness Checklist",
    icon: <FitnessCenterIcon color="secondary" />,
    component: <FitnessChecklist />,
  },
  {
    key: "stretch",
    label: "Stretch Sequence",
    icon: <AccessibilityNewIcon color="info" />,
    component: <StretchSequence />,
  },
  {
    key: "journal",
    label: "Mental Health Journal",
    icon: <PsychologyIcon color="success" />,
    component: <MentalHealthJournal />,
  },
  {
    key: "weight",
    label: "Weight Tracker",
    icon: <MonitorWeightIcon color="warning" />,
    component: <WeightTracker />,
  },
];

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("dashboard");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleSelect = (key) => {
    setSelected(key);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }} color="inherit" elevation={1}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle} edge="start" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Health App Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={open}
        onClose={handleDrawerToggle}
        sx={{
          width: open ? drawerWidth : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : 0,
            boxSizing: "border-box",
            borderRight: "none",
            boxShadow: "none",
            transition: "width 0.3s",
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          {componentsList.map((item) => (
            <ListItem button key={item.key} selected={selected === item.key} onClick={() => handleSelect(item.key)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <Toolbar />
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "calc(100vh - 64px)", width: "100%" }}>
          <Box sx={{ width: "100%", maxWidth: 1200, px: { xs: 1, sm: 2, md: 3 } }}>
            {!selected ? (
              <Grid container spacing={3}>
                {componentsList.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.key}>
                    <Card>
                      <CardActionArea onClick={() => handleSelect(item.key)}>
                        <CardContent sx={{ textAlign: "center", minHeight: 120 }}>
                          {item.icon}
                          <Typography variant="h6" sx={{ mt: 2 }}>
                            {item.label}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              // نمایش کامپوننت انتخاب شده
              componentsList.find((c) => c.key === selected)?.component
            )}
          </Box>
        </Box>
      </Main>
    </Box>
  );
}
