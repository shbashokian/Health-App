import React, { useState } from "react";
import { Box, Card, CardContent, Typography, TextField, Button, Paper, Grid, LinearProgress } from "@mui/material";
import { format } from "date-fns";
import { weightData } from "../data/fakeData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import FlagIcon from "@mui/icons-material/Flag";

const WeightTracker = () => {
  const [history, setHistory] = useState(weightData.history);
  const [newWeight, setNewWeight] = useState("");
  const [goal, setGoal] = useState(weightData.goal);

  const handleAddWeight = () => {
    if (newWeight) {
      const entry = {
        date: format(new Date(), "yyyy-MM-dd"),
        weight: parseFloat(newWeight),
      };
      setHistory([entry, ...history]);
      setNewWeight("");
    }
  };

  const handleUpdateGoal = () => {
    if (goal) {
      setGoal(parseFloat(goal));
    }
  };

  const chartData = history.map((entry) => ({
    date: format(new Date(entry.date), "MM/dd"),
    weight: entry.weight,
  }));

  const latestWeight = history[0]?.weight || 0;
  const progress = ((latestWeight - goal) / (history[history.length - 1]?.weight - goal)) * 100;

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Weight Tracker
        </Typography>

        {/* Current Weight and Goal */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 3, textAlign: "center", background: "linear-gradient(135deg, #b3e5fc 0%, #2196f3 100%)", color: "#fff", borderRadius: 4, boxShadow: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
              <MonitorWeightIcon sx={{ fontSize: 36, mb: 1 }} />
              <Typography variant="subtitle2" color="#e3f2fd" fontWeight={700}>
                Current Weight
              </Typography>
              <Typography variant="h4" fontWeight={700}>
                {latestWeight} kg
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 3, textAlign: "center", background: "linear-gradient(135deg, #ffe082 0%, #ffb300 100%)", color: "#fff", borderRadius: 4, boxShadow: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
              <FlagIcon sx={{ fontSize: 36, mb: 1 }} />
              <Typography variant="subtitle2" color="#fffde7" fontWeight={700}>
                Goal Weight
              </Typography>
              <Typography variant="h4" fontWeight={700}>
                {goal} kg
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Progress Bar */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" gutterBottom fontWeight={700}>
            Progress to Goal
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <LinearProgress variant="determinate" value={Math.abs(progress)} sx={{ height: 14, borderRadius: 7, background: "#e3f2fd", "& .MuiLinearProgress-bar": { background: "linear-gradient(90deg, #2196f3 0%, #ffb300 100%)" } }} />
            </Box>
            <Typography variant="h6" fontWeight={700} color={progress < 0 ? "#43a047" : "#f44336"}>
              {Math.abs(progress).toFixed(1)}%
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {Math.abs(progress).toFixed(1)}% {progress < 0 ? "to goal" : "from start"}
          </Typography>
        </Box>

        {/* Add New Weight */}
        <Paper sx={{ p: 3, mb: 4, background: "linear-gradient(135deg, #e3f2fd 0%, #fffde7 100%)", borderRadius: 4, boxShadow: 2 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight={700}>
            Log New Weight
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <TextField fullWidth type="number" label="Weight (kg)" value={newWeight} onChange={(e) => setNewWeight(e.target.value)} inputProps={{ step: 0.1, min: 0 }} sx={{ background: "#fff", borderRadius: 2 }} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button fullWidth variant="contained" onClick={handleAddWeight} disabled={!newWeight} sx={{ py: 1.2, fontWeight: 700, fontSize: 16, borderRadius: 3, background: "linear-gradient(90deg, #2196f3 0%, #ffb300 100%)", boxShadow: 2, "&:hover": { background: "linear-gradient(90deg, #ffb300 0%, #2196f3 100%)", boxShadow: 4 } }}>
                Add Weight
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Update Goal */}
        <Paper sx={{ p: 3, mb: 4, background: "linear-gradient(135deg, #fffde7 0%, #ffe082 100%)", borderRadius: 4, boxShadow: 2 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight={700}>
            Update Goal
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <TextField fullWidth type="number" label="Goal Weight (kg)" value={goal} onChange={(e) => setGoal(e.target.value)} inputProps={{ step: 0.1, min: 0 }} sx={{ background: "#fff", borderRadius: 2 }} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button fullWidth variant="outlined" onClick={handleUpdateGoal} disabled={!goal} sx={{ py: 1.2, fontWeight: 700, fontSize: 16, borderRadius: 3, color: "#ffb300", borderColor: "#ffb300", "&:hover": { background: "#fffde7", borderColor: "#2196f3", color: "#2196f3" } }}>
                Update Goal
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Weight Chart */}
        <Box sx={{ height: 300, background: "linear-gradient(90deg, #e3f2fd 60%, #fffde7 100%)", borderRadius: 4, boxShadow: 2, p: 2, mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight={700}>
            Weight History
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={["dataMin - 2", "dataMax + 2"]} />
              <Tooltip />
              <ReferenceLine y={goal} stroke="#ffb300" strokeDasharray="3 3" label="Goal" />
              <Line type="monotone" dataKey="weight" stroke="#2196F3" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Recent History */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight={700}>
            Recent Logs
          </Typography>
          {history.map((entry, index) => (
            <Paper
              key={index}
              sx={{
                p: 2.5,
                mb: 1.5,
                background: "linear-gradient(90deg, #e3f2fd 60%, #ffe082 100%)",
                borderRadius: 3,
                boxShadow: 2,
              }}
            >
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" fontWeight={700}>
                    {format(new Date(entry.date), "MMM dd, yyyy")}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="#2196f3" align="right" fontWeight={700}>
                    {entry.weight} kg
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeightTracker;
