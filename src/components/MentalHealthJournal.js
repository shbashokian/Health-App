// Mental Health Journal component

import React, { useState } from "react";
import { Box, Card, CardContent, Typography, TextField, Button, Chip, Paper, Grid, Autocomplete } from "@mui/material";
import { format } from "date-fns";
import { mentalHealthData } from "../data/fakeData";
import { moodData } from "../data/fakeData";

const MentalHealthJournal = () => {
  const [entries, setEntries] = useState(mentalHealthData.history);
  const [newEntry, setNewEntry] = useState({
    mood: "",
    tags: [],
    entry: "",
  });

  const handleAddEntry = () => {
    if (newEntry.entry && newEntry.mood) {
      const entry = {
        date: format(new Date(), "yyyy-MM-dd"),
        mood: newEntry.mood,
        tags: newEntry.tags,
        entry: newEntry.entry,
      };
      setEntries([entry, ...entries]);
      setNewEntry({
        mood: "",
        tags: [],
        entry: "",
      });
    }
  };

  const getMoodEmoji = (mood) => {
    const moodIndex = Object.keys(moodData.colors).indexOf(mood);
    return moodData.emojis[moodIndex];
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Mental Health Journal
        </Typography>

        {/* New Entry Form */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight={700}>
            New Journal Entry
          </Typography>
          <Paper sx={{ p: 3, mb: 2, background: "linear-gradient(135deg, #b2dfdb 0%, #ce93d8 100%)", borderRadius: 4, boxShadow: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  options={Object.keys(moodData.colors)}
                  value={newEntry.mood}
                  onChange={(e, newValue) => setNewEntry({ ...newEntry, mood: newValue })}
                  renderInput={(params) => <TextField {...params} label="How are you feeling?" fullWidth />}
                  renderOption={(props, option) => (
                    <Box component="li" {...props} sx={{ display: "flex", alignItems: "center", gap: 1, p: 1, borderRadius: 2, "&:hover": { background: moodData.colors[option] + "22" } }}>
                      <Typography variant="h4" sx={{ mr: 1 }}>
                        {getMoodEmoji(option)}
                      </Typography>
                      <Typography variant="body1" fontWeight={700}>
                        {option}
                      </Typography>
                    </Box>
                  )}
                  ListboxProps={{ sx: { width: "100%", maxWidth: "100vw" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete multiple options={mentalHealthData.tags} value={newEntry.tags} onChange={(e, newValue) => setNewEntry({ ...newEntry, tags: newValue })} renderInput={(params) => <TextField {...params} label="Tags" fullWidth />} renderTags={(value, getTagProps) => value.map((option, index) => <Chip label={option} {...getTagProps({ index })} sx={{ m: 0.5, background: "linear-gradient(90deg, #ce93d8 0%, #b2dfdb 100%)", color: "#fff", fontWeight: 700 }} />)} ListboxProps={{ sx: { width: "100%", maxWidth: "100vw" } }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth multiline rows={4} label="Write your thoughts..." value={newEntry.entry} onChange={(e) => setNewEntry({ ...newEntry, entry: e.target.value })} sx={{ background: "#fafafa", borderRadius: 2, boxShadow: 1 }} />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleAddEntry}
                  disabled={!newEntry.entry || !newEntry.mood}
                  sx={{
                    py: 1.5,
                    fontWeight: 700,
                    fontSize: 18,
                    borderRadius: 3,
                    background: "linear-gradient(90deg, #ce93d8 0%, #b2dfdb 100%)",
                    boxShadow: 3,
                    transition: "background 0.2s",
                    "&:hover": {
                      background: "linear-gradient(90deg, #b2dfdb 0%, #ce93d8 100%)",
                      boxShadow: 6,
                    },
                  }}
                >
                  Save Entry
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Journal History */}
        <Box>
          <Typography variant="subtitle1" gutterBottom fontWeight={700}>
            Recent Entries
          </Typography>
          {entries.map((entry, index) => (
            <Paper
              key={index}
              sx={{
                p: 2.5,
                mb: 1.5,
                background: `linear-gradient(90deg, #f3e5f5 60%, ${moodData.colors[entry.mood]}22 100%)`,
                borderLeft: `6px solid ${moodData.colors[entry.mood]}`,
                borderRadius: 3,
                boxShadow: 2,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="h3">{getMoodEmoji(entry.mood)}</Typography>
                    <Typography variant="subtitle2" fontWeight={700}>
                      {format(new Date(entry.date), "MMM dd, yyyy")}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }} fontWeight={700}>
                    {entry.entry}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {entry.tags.map((tag, tagIndex) => (
                      <Chip key={tagIndex} label={tag} size="small" sx={{ background: "linear-gradient(90deg, #ce93d8 0%, #b2dfdb 100%)", color: "#fff", fontWeight: 700, m: 0.5 }} />
                    ))}
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

export default MentalHealthJournal;
