// Health Dashboard component

import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, Grid, Paper, IconButton, CircularProgress, Tooltip } from "@mui/material";
import { format } from "date-fns";
import { healthData } from "../data/fakeData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import SyncIcon from "@mui/icons-material/Sync";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

const HealthDashboard = () => {
  const [data, setData] = useState(healthData);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(new Date(healthData.lastSync));

  const handleSync = () => {
    setIsSyncing(true);
    // Simulate API call
    setTimeout(() => {
      setLastSync(new Date());
      setIsSyncing(false);
    }, 2000);
  };

  const getHeartRateStatus = (rate) => {
    if (rate < 60) return { color: "info.main", label: "Low" };
    if (rate > 100) return { color: "error.main", label: "High" };
    return { color: "success.main", label: "Normal" };
  };

  const getBloodPressureStatus = (systolic, diastolic) => {
    if (systolic < 120 && diastolic < 80) return { color: "success.main", label: "Normal" };
    if (systolic < 130 && diastolic < 80) return { color: "info.main", label: "Elevated" };
    if (systolic >= 130 || diastolic >= 80) return { color: "error.main", label: "High" };
    return { color: "warning.main", label: "Unknown" };
  };

  const latestBP = data.vitals.bloodPressure[0];
  const latestHR = data.vitals.heartRate[0];
  const latestSteps = data.vitals.steps[0];
  const latestCalories = data.vitals.calories[0];

  const heartRateStatus = getHeartRateStatus(latestHR);
  const bloodPressureStatus = getBloodPressureStatus(latestBP[0], latestBP[1]);

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5">Health Dashboard</Typography>
          <Tooltip title="Sync with device">
            <IconButton onClick={handleSync} disabled={isSyncing}>
              {isSyncing ? <CircularProgress size={24} /> : <SyncIcon />}
            </IconButton>
          </Tooltip>
        </Box>

        {/* Last Sync Time */}
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Last synced: {format(lastSync, "MMM dd, yyyy HH:mm")}
        </Typography>

        {/* Vital Signs */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {[
            {
              icon: <FavoriteIcon sx={{ color: heartRateStatus.color, fontSize: 40, mb: 1 }} />,
              value: `${latestHR} BPM`,
              label: "Heart Rate",
              status: heartRateStatus.label,
              statusColor: heartRateStatus.color,
              bg: "linear-gradient(135deg, #f8bbd0 0%, #f44336 100%)",
            },
            {
              icon: <MonitorHeartIcon sx={{ color: bloodPressureStatus.color, fontSize: 40, mb: 1 }} />,
              value: `${latestBP[0]}/${latestBP[1]}`,
              label: "Blood Pressure",
              status: bloodPressureStatus.label,
              statusColor: bloodPressureStatus.color,
              bg: "linear-gradient(135deg, #b3e5fc 0%, #2196f3 100%)",
            },
            {
              icon: <DirectionsWalkIcon sx={{ color: "#1976d2", fontSize: 40, mb: 1 }} />,
              value: latestSteps.toLocaleString(),
              label: "Steps Today",
              status: "",
              statusColor: "",
              bg: "linear-gradient(135deg, #c8e6c9 0%, #43a047 100%)",
            },
            {
              icon: <LocalFireDepartmentIcon sx={{ color: "#ff9800", fontSize: 40, mb: 1 }} />,
              value: latestCalories,
              label: "Calories Burned",
              status: "",
              statusColor: "",
              bg: "linear-gradient(135deg, #ffe0b2 0%, #ff9800 100%)",
            },
          ].map((item, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Paper
                sx={{
                  p: 2,
                  textAlign: "center",
                  minHeight: 170,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: item.bg,
                  color: "#222",
                  borderRadius: 4,
                  boxShadow: 4,
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.04)",
                    boxShadow: 8,
                  },
                }}
              >
                {item.icon}
                <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
                  {item.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  {item.label}
                </Typography>
                {item.status && (
                  <Typography variant="caption" sx={{ color: item.statusColor, fontWeight: 600 }}>
                    {item.status}
                  </Typography>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Heart Rate Chart */}
        <Box sx={{ height: 300, mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Heart Rate History
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.vitals.heartRate.map((rate, index) => ({ value: rate, time: index }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={["dataMin - 10", "dataMax + 10"]} />
              <RechartsTooltip />
              <Line type="monotone" dataKey="value" stroke="#f44336" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Blood Pressure Chart */}
        <Box sx={{ height: 300 }}>
          <Typography variant="subtitle1" gutterBottom>
            Blood Pressure History
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data.vitals.bloodPressure.map((bp, index) => ({
                systolic: bp[0],
                diastolic: bp[1],
                time: index,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={["dataMin - 10", "dataMax + 10"]} />
              <RechartsTooltip />
              <Line type="monotone" dataKey="systolic" stroke="#f44336" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Systolic" />
              <Line type="monotone" dataKey="diastolic" stroke="#2196f3" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Diastolic" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HealthDashboard;
