// Water Tracker component
import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Grid, Button, LinearProgress, IconButton } from "@mui/material";
import { format } from "date-fns";
import { waterData } from "../data/fakeData";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import OpacityIcon from "@mui/icons-material/Opacity";

const WaterTracker = () => {
  const [todayAmount, setTodayAmount] = useState(0);
  const [history, setHistory] = useState(waterData.history);

  const handleAddWater = (amount) => {
    const newAmount = todayAmount + amount;
    setTodayAmount(newAmount);

    // Update history
    const today = format(new Date(), "yyyy-MM-dd");
    const todayEntry = history.find((entry) => entry.date === today);

    if (todayEntry) {
      setHistory(history.map((entry) => (entry.date === today ? { ...entry, amount: newAmount } : entry)));
    } else {
      setHistory([{ date: today, amount: newAmount }, ...history]);
    }
  };

  const handleRemoveWater = (amount) => {
    const newAmount = Math.max(0, todayAmount - amount);
    setTodayAmount(newAmount);

    // Update history
    const today = format(new Date(), "yyyy-MM-dd");
    setHistory(history.map((entry) => (entry.date === today ? { ...entry, amount: newAmount } : entry)));
  };

  const progress = (todayAmount / waterData.dailyGoal) * 100;

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom fontWeight={700}>
          Water Tracker
        </Typography>

        {/* Progress Bar */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight={700}>
            Today's Progress
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
            <Box sx={{ position: "relative", width: 80, height: 80, mr: 2 }}>
              <svg width="80" height="80">
                <circle cx="40" cy="40" r="36" fill="#e3f2fd" />
                <circle cx="40" cy="40" r="36" fill="none" stroke="#2196f3" strokeWidth="7" strokeDasharray={2 * Math.PI * 36} strokeDashoffset={2 * Math.PI * 36 * (1 - progress / 100)} strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.5s" }} />
              </svg>
              <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <OpacityIcon sx={{ color: "#2196f3", fontSize: 32, mb: 0.5 }} />
                <Typography variant="h6" fontWeight={700}>
                  {Math.round(progress)}%
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700} color="#2196f3">
                {todayAmount}ml
              </Typography>
              <Typography variant="body2" color="text.secondary">
                / {waterData.dailyGoal}ml
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Cup Size Buttons */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight={700}>
            Add Water
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {waterData.cupSizes.map((size) => (
              <Grid item key={size}>
                <Button
                  variant="contained"
                  onClick={() => handleAddWater(size)}
                  sx={{
                    minWidth: 64,
                    height: 64,
                    borderRadius: "50%",
                    fontWeight: 700,
                    fontSize: 18,
                    background: "linear-gradient(135deg, #64b5f6 0%, #1976d2 100%)",
                    color: "#fff",
                    boxShadow: 3,
                    transition: "background 0.2s",
                    "&:hover": {
                      background: "linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)",
                      boxShadow: 6,
                    },
                  }}
                >
                  {size}ml
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Quick Adjust */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight={700}>
            Quick Adjust
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "center" }}>
            <IconButton
              onClick={() => handleRemoveWater(100)}
              disabled={todayAmount === 0}
              sx={{
                bgcolor: "#e3f2fd",
                color: "#1976d2",
                borderRadius: "50%",
                p: 2,
                boxShadow: 2,
                "&:hover": { bgcolor: "#bbdefb" },
                fontSize: 28,
              }}
            >
              <RemoveIcon fontSize="inherit" />
            </IconButton>
            <Typography variant="h6" fontWeight={700} color="#1976d2">
              100ml
            </Typography>
            <IconButton
              onClick={() => handleAddWater(100)}
              sx={{
                bgcolor: "#e3f2fd",
                color: "#1976d2",
                borderRadius: "50%",
                p: 2,
                boxShadow: 2,
                "&:hover": { bgcolor: "#bbdefb" },
                fontSize: 28,
              }}
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </Box>

        {/* History */}
        <Box>
          <Typography variant="subtitle1" gutterBottom fontWeight={700}>
            Recent History
          </Typography>
          {history.map((entry, index) => (
            <Box
              key={index}
              sx={{
                p: 2,
                mb: 1.5,
                background: "linear-gradient(90deg, #e3f2fd 60%, #bbdefb 100%)",
                borderRadius: 3,
                boxShadow: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body1" fontWeight={700}>
                {format(new Date(entry.date), "MMM dd, yyyy")}
              </Typography>
              <Typography variant="h6" color="#1976d2" fontWeight={700}>
                {entry.amount}ml
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default WaterTracker;
