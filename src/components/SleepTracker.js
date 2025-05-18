// Sleep Tracker component

import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Grid, TextField, Button, Paper, Rating } from "@mui/material";
import { format } from "date-fns";
import { sleepData } from "../data/fakeData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const SleepTracker = () => {
  const [history, setHistory] = useState(sleepData.history);
  const [newEntry, setNewEntry] = useState({ hours: "", quality: 3 });

  const handleAddSleep = () => {
    if (newEntry.hours) {
      const entry = {
        date: format(new Date(), "yyyy-MM-dd"),
        hours: parseFloat(newEntry.hours),
        quality: newEntry.quality,
      };
      setHistory([entry, ...history]);
      setNewEntry({ hours: "", quality: 3 });
    }
  };

  const getQualityLabel = (quality) => {
    switch (quality) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "Good";
    }
  };

  const chartData = history.map((entry) => ({
    date: format(new Date(entry.date), "MM/dd"),
    hours: entry.hours,
    quality: entry.quality,
  }));

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Sleep Tracker
        </Typography>

        {/* Add New Entry */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight={700}>
            Log Sleep
          </Typography>
          <Paper sx={{ p: 3, mb: 2, background: "linear-gradient(135deg, #b3e5fc 0%, #ce93d8 100%)", borderRadius: 4, boxShadow: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Hours Slept" type="number" value={newEntry.hours} onChange={(e) => setNewEntry({ ...newEntry, hours: e.target.value })} inputProps={{ step: 0.5, min: 0, max: 24 }} sx={{ background: "#fff", borderRadius: 2 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2" fontWeight={700}>
                    Quality:
                  </Typography>
                  <Rating value={newEntry.quality} onChange={(e, newValue) => setNewEntry({ ...newEntry, quality: newValue })} sx={{ color: "#7e57c2" }} />
                  <Typography variant="body2" color="text.secondary">
                    {getQualityLabel(newEntry.quality)}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleAddSleep}
                  disabled={!newEntry.hours}
                  sx={{
                    py: 1.5,
                    fontWeight: 700,
                    fontSize: 18,
                    borderRadius: 3,
                    background: "linear-gradient(90deg, #7e57c2 0%, #29b6f6 100%)",
                    boxShadow: 3,
                    transition: "background 0.2s",
                    "&:hover": {
                      background: "linear-gradient(90deg, #29b6f6 0%, #7e57c2 100%)",
                      boxShadow: 6,
                    },
                  }}
                >
                  Add Sleep Log
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Sleep Chart */}
        <Box sx={{ height: 300, mb: 4, background: "linear-gradient(90deg, #e3f2fd 60%, #f3e5f5 100%)", borderRadius: 4, boxShadow: 2, p: 2 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight={700}>
            Sleep History
          </Typography>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" stroke="#7e57c2" />
              <YAxis yAxisId="right" orientation="right" stroke="#29b6f6" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="hours" stroke="#7e57c2" name="Hours" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
              <Line yAxisId="right" type="monotone" dataKey="quality" stroke="#29b6f6" name="Quality" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Recent History */}
        <Box>
          <Typography variant="subtitle1" gutterBottom fontWeight={700}>
            Recent Logs
          </Typography>
          {history.map((entry, index) => (
            <Paper
              key={index}
              sx={{
                p: 2.5,
                mb: 1.5,
                background: "linear-gradient(90deg, #e3f2fd 60%, #ce93d8 100%)",
                borderRadius: 3,
                boxShadow: 2,
              }}
            >
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2" fontWeight={700}>
                    {format(new Date(entry.date), "MMM dd, yyyy")}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" fontWeight={700}>
                    {entry.hours} hours
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Rating value={entry.quality} readOnly size="small" sx={{ color: "#7e57c2" }} />
                    <Typography variant="body2" color="text.secondary">
                      {getQualityLabel(entry.quality)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SleepTracker;
