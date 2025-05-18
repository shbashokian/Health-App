// Mood Tracker component
import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Grid, Button, TextField, Paper } from "@mui/material";
import { format } from "date-fns";
import { moodData } from "../data/fakeData";

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [history, setHistory] = useState(moodData.history);

  const handleMoodSelect = (emoji) => {
    setSelectedMood(emoji);
  };

  const handleSave = () => {
    if (selectedMood) {
      const newEntry = {
        date: format(new Date(), "yyyy-MM-dd"),
        mood: Object.keys(moodData.colors)[moodData.emojis.indexOf(selectedMood)],
        note: note,
      };
      setHistory([newEntry, ...history]);
      setSelectedMood(null);
      setNote("");
    }
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Mood Tracker
        </Typography>

        {/* Emoji Buttons */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight={700}>
            How are you feeling today?
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {moodData.emojis.map((emoji, index) => (
              <Grid item key={emoji}>
                <Button
                  variant="contained"
                  onClick={() => handleMoodSelect(emoji)}
                  sx={{
                    minWidth: 72,
                    height: 72,
                    fontSize: 36,
                    borderRadius: "50%",
                    boxShadow: selectedMood === emoji ? 6 : 2,
                    background: selectedMood === emoji ? `linear-gradient(135deg, ${moodData.colors[Object.keys(moodData.colors)[index]]} 60%, #fff 100%)` : `linear-gradient(135deg, #fff 60%, ${moodData.colors[Object.keys(moodData.colors)[index]]}33 100%)`,
                    color: "#222",
                    border: selectedMood === emoji ? `3px solid ${moodData.colors[Object.keys(moodData.colors)[index]]}` : "2px solid #eee",
                    transition: "all 0.2s",
                    "&:hover": {
                      background: `linear-gradient(135deg, ${moodData.colors[Object.keys(moodData.colors)[index]]} 60%, #fff 100%)`,
                      boxShadow: 8,
                    },
                  }}
                >
                  {emoji}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Note Input */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={2}
            label="Add a note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            sx={{
              background: "#fafafa",
              borderRadius: 2,
              boxShadow: 1,
            }}
          />
        </Box>

        {/* Save Button */}
        <Box sx={{ mb: 3 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSave}
            disabled={!selectedMood}
            sx={{
              py: 1.5,
              fontWeight: 700,
              fontSize: 18,
              borderRadius: 3,
              background: "linear-gradient(90deg, #ffb300 0%, #ff7043 100%)",
              boxShadow: 3,
              transition: "background 0.2s",
              "&:hover": {
                background: "linear-gradient(90deg, #ff7043 0%, #ffb300 100%)",
                boxShadow: 6,
              },
            }}
          >
            Save Mood
          </Button>
        </Box>

        {/* History */}
        <Box>
          <Typography variant="subtitle1" gutterBottom fontWeight={700}>
            Recent Moods
          </Typography>
          {history.map((entry, index) => (
            <Paper
              key={index}
              sx={{
                p: 2.5,
                mb: 1.5,
                background: `linear-gradient(90deg, #fff 60%, ${moodData.colors[entry.mood]}22 100%)`,
                borderLeft: `6px solid ${moodData.colors[entry.mood]}`,
                borderRadius: 3,
                boxShadow: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box sx={{ minWidth: 56, textAlign: "center" }}>
                <Typography variant="h3" sx={{ lineHeight: 1 }}>
                  {moodData.emojis[Object.keys(moodData.colors).indexOf(entry.mood)]}
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" fontWeight={700}>
                  {format(new Date(entry.date), "MMM dd, yyyy")}
                </Typography>
                {entry.note && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {entry.note}
                  </Typography>
                )}
              </Box>
            </Paper>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
