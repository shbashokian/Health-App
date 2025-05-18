// Stretch Sequence component

import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Button, CircularProgress, Paper, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { format } from "date-fns";
import { stretchData } from "../data/fakeData";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const StretchSequence = () => {
  const [selectedSequence, setSelectedSequence] = useState("");
  const [exercises, setExercises] = useState([]);
  const [activeExercise, setActiveExercise] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (selectedSequence) {
      const sequence = stretchData.sequences.find((s) => s.id === parseInt(selectedSequence));
      if (sequence) {
        setExercises(stretchData.exercises);
      }
    }
  }, [selectedSequence]);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      if (currentIndex < exercises.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setActiveExercise(exercises[currentIndex + 1]);
        setTimeLeft(exercises[currentIndex + 1].duration);
      } else {
        setIsRunning(false);
        setActiveExercise(null);
        setCurrentIndex(0);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, currentIndex, exercises]);

  const handleStartSequence = () => {
    if (exercises.length > 0) {
      setActiveExercise(exercises[0]);
      setTimeLeft(exercises[0].duration);
      setIsRunning(true);
      setCurrentIndex(0);
    }
  };

  const handlePauseSequence = () => {
    setIsRunning(false);
  };

  const handleStopSequence = () => {
    setIsRunning(false);
    setActiveExercise(null);
    setTimeLeft(0);
    setCurrentIndex(0);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(exercises);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setExercises(items);
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
          Stretch Sequence
        </Typography>

        {/* Sequence Selector */}
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel>Select Sequence</InputLabel>
          <Select
            value={selectedSequence}
            label="Select Sequence"
            onChange={(e) => setSelectedSequence(e.target.value)}
            sx={{
              background: "linear-gradient(90deg, #e3f2fd 60%, #b2dfdb 100%)",
              borderRadius: 3,
              fontWeight: 700,
              boxShadow: 2,
            }}
          >
            {stretchData.sequences.map((sequence) => (
              <MenuItem key={sequence.id} value={sequence.id} sx={{ fontWeight: 700 }}>
                {sequence.name} ({formatTime(sequence.duration)})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Active Exercise Timer */}
        {activeExercise && (
          <Paper
            sx={{
              p: 3,
              mb: 4,
              background: "linear-gradient(135deg, #b2dfdb 0%, #42a5f5 100%)",
              color: "white",
              borderRadius: 4,
              boxShadow: 6,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight={700}>
              {activeExercise.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2, position: "relative", height: 110 }}>
              <CircularProgress variant="determinate" value={(timeLeft / activeExercise.duration) * 100} size={100} thickness={5} sx={{ color: "#fff", filter: "drop-shadow(0 2px 8px #42a5f588)" }} />
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
                <IconButton onClick={handlePauseSequence} sx={{ color: "#fff", bgcolor: "#00796b", "&:hover": { bgcolor: "#004d40" }, mx: 1, p: 2 }}>
                  <PauseIcon fontSize="large" />
                </IconButton>
              ) : (
                <IconButton onClick={() => setIsRunning(true)} sx={{ color: "#fff", bgcolor: "#00796b", "&:hover": { bgcolor: "#004d40" }, mx: 1, p: 2 }}>
                  <PlayArrowIcon fontSize="large" />
                </IconButton>
              )}
              <IconButton onClick={handleStopSequence} sx={{ color: "#fff", bgcolor: "#d84315", "&:hover": { bgcolor: "#bf360c" }, mx: 1, p: 2 }}>
                <StopIcon fontSize="large" />
              </IconButton>
            </Box>
          </Paper>
        )}

        {/* Exercise List */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="exercises">
            {(provided) => (
              <List {...provided.droppableProps} ref={provided.innerRef}>
                {exercises.map((exercise, index) => (
                  <Draggable key={exercise.id} draggableId={exercise.id.toString()} index={index}>
                    {(provided) => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        sx={{
                          mb: 2,
                          background: "linear-gradient(90deg, #e3f2fd 60%, #b2dfdb 100%)",
                          borderRadius: 3,
                          boxShadow: 2,
                          display: "flex",
                          alignItems: "center",
                          transition: "transform 0.15s, box-shadow 0.15s",
                          "&:hover": {
                            transform: "scale(1.025)",
                            boxShadow: 6,
                          },
                        }}
                      >
                        <Box {...provided.dragHandleProps} sx={{ color: "#42a5f5", mr: 2, cursor: "grab" }}>
                          <DragIndicatorIcon fontSize="large" />
                        </Box>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" fontWeight={700}>
                              {exercise.name}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body2" color="primary" fontWeight={600}>
                              {formatTime(exercise.duration)}
                            </Typography>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={() => {
                              setActiveExercise(exercise);
                              setTimeLeft(exercise.duration);
                              setIsRunning(true);
                              setCurrentIndex(index);
                            }}
                            disabled={!!activeExercise}
                            sx={{ color: "#1976d2", bgcolor: "#fff", boxShadow: 1, "&:hover": { bgcolor: "#e3f2fd" }, p: 1.5 }}
                          >
                            <PlayArrowIcon fontSize="large" />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>

        {/* Start Sequence Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleStartSequence}
          disabled={exercises.length === 0 || !!activeExercise}
          sx={{
            mt: 3,
            py: 1.5,
            fontWeight: 700,
            fontSize: 18,
            borderRadius: 3,
            background: "linear-gradient(90deg, #42a5f5 0%, #26c6da 100%)",
            boxShadow: 3,
            transition: "background 0.2s",
            "&:hover": {
              background: "linear-gradient(90deg, #26c6da 0%, #42a5f5 100%)",
              boxShadow: 6,
            },
          }}
        >
          Start Sequence
        </Button>
      </CardContent>
    </Card>
  );
};

export default StretchSequence;
