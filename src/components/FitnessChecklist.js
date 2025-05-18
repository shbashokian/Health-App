// Fitness Checklist component

import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, Button, CircularProgress, Paper } from "@mui/material";
import { format } from "date-fns";
import { fitnessData } from "../data/fakeData";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";

const FitnessChecklist = () => {
  const [exercises, setExercises] = useState(fitnessData.exercises);
  const [history, setHistory] = useState(fitnessData.history);
  const [activeExercise, setActiveExercise] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setActiveExercise(null);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleStartExercise = (exercise) => {
    setActiveExercise(exercise);
    setTimeLeft(exercise.duration);
    setIsRunning(true);
  };

  const handlePauseExercise = () => {
    setIsRunning(false);
  };

  const handleStopExercise = () => {
    setIsRunning(false);
    setActiveExercise(null);
    setTimeLeft(0);
  };

  const handleToggleComplete = (id) => {
    setExercises(exercises.map((exercise) => (exercise.id === id ? { ...exercise, completed: !exercise.completed } : exercise)));
  };

  const handleSaveWorkout = () => {
    const completedExercises = exercises.filter((exercise) => exercise.completed).map((exercise) => exercise.id);

    if (completedExercises.length > 0) {
      const today = format(new Date(), "yyyy-MM-dd");
      setHistory([{ date: today, completed: completedExercises }, ...history]);
      setExercises(fitnessData.exercises); // Reset exercises
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Fitness Checklist
        </Typography>

        {/* Active Exercise Timer */}
        {activeExercise && (
          <Paper
            sx={{
              p: 3,
              mb: 3,
              background: "linear-gradient(135deg, #b2dfdb 0%, #009688 100%)",
              color: "white",
              borderRadius: 4,
              boxShadow: 6,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, letterSpacing: 1 }}>
              {activeExercise.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2, position: "relative", height: 110 }}>
              <CircularProgress variant="determinate" value={(timeLeft / activeExercise.duration) * 100} size={100} thickness={5} sx={{ color: "#fff", filter: "drop-shadow(0 2px 8px #00968888)" }} />
              <Typography
                variant="h3"
                sx={{
                  position: "absolute",
                  color: "white",
                  fontWeight: 700,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                }}
              >
                {formatTime(timeLeft)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              {isRunning ? (
                <IconButton onClick={handlePauseExercise} sx={{ color: "#fff", bgcolor: "#00796b", "&:hover": { bgcolor: "#004d40" }, mx: 1, p: 2 }}>
                  <PauseIcon fontSize="large" />
                </IconButton>
              ) : (
                <IconButton onClick={() => setIsRunning(true)} sx={{ color: "#fff", bgcolor: "#00796b", "&:hover": { bgcolor: "#004d40" }, mx: 1, p: 2 }}>
                  <PlayArrowIcon fontSize="large" />
                </IconButton>
              )}
              <IconButton onClick={handleStopExercise} sx={{ color: "#fff", bgcolor: "#d84315", "&:hover": { bgcolor: "#bf360c" }, mx: 1, p: 2 }}>
                <StopIcon fontSize="large" />
              </IconButton>
            </Box>
          </Paper>
        )}

        {/* Exercise List */}
        <List>
          {exercises.map((exercise) => (
            <ListItem
              key={exercise.id}
              sx={{
                mb: 2,
                background: "linear-gradient(135deg, #e3f2fd 0%, #90caf9 100%)",
                borderRadius: 3,
                boxShadow: 2,
                minHeight: 72,
                transition: "transform 0.15s, box-shadow 0.15s",
                "&:hover": {
                  transform: "scale(1.025)",
                  boxShadow: 6,
                },
                display: "flex",
                alignItems: "center",
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="subtitle1" fontWeight={700}>
                    {exercise.name}
                  </Typography>
                }
                secondary={
                  exercise.duration > 0 ? (
                    <Typography variant="body2" color="primary" fontWeight={600}>
                      {formatTime(exercise.duration)} min
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="secondary" fontWeight={600}>
                      {exercise.sets} sets × {exercise.reps} reps
                    </Typography>
                  )
                }
              />
              <ListItemSecondaryAction>
                {exercise.duration > 0 ? (
                  <IconButton edge="end" onClick={() => handleStartExercise(exercise)} disabled={!!activeExercise} sx={{ color: "#1976d2", bgcolor: "#fff", boxShadow: 1, "&:hover": { bgcolor: "#e3f2fd" }, p: 1.5 }}>
                    <PlayArrowIcon fontSize="large" />
                  </IconButton>
                ) : (
                  <Checkbox edge="end" checked={exercise.completed} onChange={() => handleToggleComplete(exercise.id)} sx={{ "& .MuiSvgIcon-root": { fontSize: 32, color: "#43a047" } }} />
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        {/* Save Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleSaveWorkout}
          disabled={!exercises.some((exercise) => exercise.completed)}
          sx={{
            mt: 3,
            mb: 4,
            py: 1.5,
            fontWeight: 700,
            fontSize: 18,
            borderRadius: 3,
            background: "linear-gradient(90deg, #43a047 0%, #1de9b6 100%)",
            boxShadow: 3,
            transition: "background 0.2s",
            "&:hover": {
              background: "linear-gradient(90deg, #1de9b6 0%, #43a047 100%)",
              boxShadow: 6,
            },
          }}
        >
          Save Workout
        </Button>

        {/* History */}
        <Box>
          <Typography variant="subtitle1" gutterBottom fontWeight={700}>
            Recent Workouts
          </Typography>
          {history.map((entry, index) => (
            <Paper
              key={index}
              sx={{
                p: 2,
                mb: 1.5,
                background: "linear-gradient(90deg, #fffde7 0%, #ffe082 100%)",
                borderRadius: 3,
                boxShadow: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="subtitle2" fontWeight={700}>
                  {format(new Date(entry.date), "MMM dd, yyyy")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed: {entry.completed.length} exercises
                </Typography>
              </Box>
              <Box sx={{ color: "#43a047", fontWeight: 700, fontSize: 22 }}>💪</Box>
            </Paper>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default FitnessChecklist;
