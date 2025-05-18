// Meal Log component

import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Grid, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper } from "@mui/material";
import { format } from "date-fns";
import { mealData } from "../data/fakeData";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const MealLog = () => {
  const [meals, setMeals] = useState(mealData.meals);
  const [history, setHistory] = useState(mealData.history);
  const [newMeal, setNewMeal] = useState({ name: "", calories: "" });

  const handleAddMeal = () => {
    if (newMeal.name && newMeal.calories) {
      const meal = {
        id: meals.length + 1,
        name: newMeal.name,
        calories: parseInt(newMeal.calories),
      };
      setMeals([...meals, meal]);
      setNewMeal({ name: "", calories: "" });
    }
  };

  const handleDeleteMeal = (id) => {
    setMeals(meals.filter((meal) => meal.id !== id));
  };

  const handleSaveDay = () => {
    const today = format(new Date(), "yyyy-MM-dd");
    const todayMeals = meals.map((meal) => meal.calories);
    const total = todayMeals.reduce((sum, calories) => sum + calories, 0);

    setHistory([{ date: today, meals: todayMeals, total }, ...history]);
    setMeals(mealData.meals); // Reset to default meals
  };

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Meal Log
        </Typography>

        {/* Add New Meal */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight={700}>
            Add New Meal
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={5}>
              <TextField fullWidth label="Meal Name" value={newMeal.name} onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })} sx={{ background: "#fafafa", borderRadius: 2, boxShadow: 1 }} />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField fullWidth label="Calories" type="number" value={newMeal.calories} onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })} sx={{ background: "#fafafa", borderRadius: 2, boxShadow: 1 }} />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleAddMeal}
                disabled={!newMeal.name || !newMeal.calories}
                sx={{
                  minWidth: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #ffb74d 0%, #ff7043 100%)",
                  color: "#fff",
                  boxShadow: 3,
                  fontSize: 24,
                  "&:hover": {
                    background: "linear-gradient(135deg, #ff7043 0%, #ffb74d 100%)",
                    boxShadow: 6,
                  },
                }}
              >
                <AddIcon fontSize="inherit" />
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Today's Meals */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight={700}>
            Today's Meals
          </Typography>
          <List>
            {meals.map((meal) => (
              <ListItem
                key={meal.id}
                sx={{
                  mb: 2,
                  background: "linear-gradient(90deg, #ffe0b2 60%, #ffcc80 100%)",
                  borderRadius: 3,
                  boxShadow: 2,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" fontWeight={700}>
                      {meal.name}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="secondary">
                      {meal.calories} calories
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteMeal(meal.id)} sx={{ color: "#ff7043", bgcolor: "#fff3e0", boxShadow: 1, "&:hover": { bgcolor: "#ffe0b2" }, p: 1.5 }}>
                    <DeleteIcon fontSize="large" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Paper sx={{ p: 2.5, mt: 2, background: "linear-gradient(90deg, #ff7043 0%, #ffb74d 100%)", borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" color="#fff" fontWeight={700}>
              Total Calories: {totalCalories}
            </Typography>
          </Paper>
        </Box>

        {/* Save Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleSaveDay}
          disabled={meals.length === 0}
          sx={{
            mb: 4,
            py: 1.5,
            fontWeight: 700,
            fontSize: 18,
            borderRadius: 3,
            background: "linear-gradient(90deg, #ff7043 0%, #ffb74d 100%)",
            boxShadow: 3,
            transition: "background 0.2s",
            "&:hover": {
              background: "linear-gradient(90deg, #ffb74d 0%, #ff7043 100%)",
              boxShadow: 6,
            },
          }}
        >
          Save Day's Log
        </Button>

        {/* History */}
        <Box>
          <Typography variant="subtitle1" gutterBottom fontWeight={700}>
            Recent History
          </Typography>
          {history.map((entry, index) => (
            <Paper
              key={index}
              sx={{
                p: 2.5,
                mb: 1.5,
                background: "linear-gradient(90deg, #fff3e0 60%, #ffe0b2 100%)",
                borderRadius: 3,
                boxShadow: 2,
              }}
            >
              <Typography variant="subtitle2" fontWeight={700}>
                {format(new Date(entry.date), "MMM dd, yyyy")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Calories: {entry.total}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Meals: {entry.meals.length}
              </Typography>
            </Paper>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MealLog;
