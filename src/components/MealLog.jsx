import React, { useState } from "react";
import { Box, Card, CardContent, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Grid, Paper, Divider, Chip, useTheme } from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const MealLog = () => {
  const theme = useTheme();
  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

  const [meals, setMeals] = useState([
    { name: "Omelette", calories: 350, type: "Breakfast" },
    { name: "Barley Soup", calories: 200, type: "Lunch" },
    { name: "Salad", calories: 150, type: "Dinner" },
    { name: "Fruits", calories: 100, type: "Snack" },
  ]);

  const [newMeal, setNewMeal] = useState({
    name: "",
    calories: "",
    type: mealTypes[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMeal.name && newMeal.calories) {
      setMeals([...meals, { ...newMeal, calories: Number(newMeal.calories) }]);
      setNewMeal({ name: "", calories: "", type: mealTypes[0] });
    }
  };

  const handleDeleteMeal = (index) => {
    const newMeals = [...meals];
    newMeals.splice(index, 1);
    setMeals(newMeals);
  };

  // Calculate total calories for each meal type
  const mealCalories = {
    Breakfast: meals.filter((meal) => meal.type === "Breakfast").reduce((sum, meal) => sum + meal.calories, 0),
    Lunch: meals.filter((meal) => meal.type === "Lunch").reduce((sum, meal) => sum + meal.calories, 0),
    Dinner: meals.filter((meal) => meal.type === "Dinner").reduce((sum, meal) => sum + meal.calories, 0),
    Snack: meals.filter((meal) => meal.type === "Snack").reduce((sum, meal) => sum + meal.calories, 0),
  };

  const pieData = Object.entries(mealCalories).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: "text.primary", mb: 4 }}>
        Meal Log
      </Typography>

      <Grid container spacing={3}>
        {/* Add Meal Form */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              background: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: "text.primary" }}>
              Add New Meal
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField fullWidth label="Food Name" value={newMeal.name} onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })} margin="normal" variant="outlined" sx={{ mb: 2 }} />
              <TextField fullWidth label="Calories" type="number" value={newMeal.calories} onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })} margin="normal" variant="outlined" sx={{ mb: 2 }} />
              <TextField
                fullWidth
                select
                label="Meal Type"
                value={newMeal.type}
                onChange={(e) => setNewMeal({ ...newMeal, type: e.target.value })}
                margin="normal"
                variant="outlined"
                SelectProps={{
                  native: true,
                }}
                sx={{ mb: 2 }}
              >
                {mealTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </TextField>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                startIcon={<AddIcon />}
                sx={{
                  mt: 2,
                  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                }}
              >
                Add Meal
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Meal List */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              background: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
              borderRadius: 2,
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: "text.primary" }}>
              Meal List
            </Typography>
            <List>
              {meals.map((meal, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    sx={{
                      mb: 1,
                      borderRadius: 1,
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Typography variant="subtitle1">{meal.name}</Typography>
                          <Chip
                            label={meal.type}
                            size="small"
                            sx={{
                              backgroundColor: theme.palette.primary.light,
                              color: theme.palette.primary.contrastText,
                            }}
                          />
                        </Box>
                      }
                      secondary={`${meal.calories} calories`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteMeal(index)}
                        sx={{
                          color: theme.palette.error.main,
                          "&:hover": {
                            backgroundColor: "rgba(211, 47, 47, 0.04)",
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < meals.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Calorie Distribution Chart */}
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              background: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
              borderRadius: 2,
              mt: 3,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: "text.primary" }}>
              Calorie Distribution
            </Typography>
            <Box sx={{ height: 400, width: "100%", direction: "ltr" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" labelLine={true} outerRadius={150} fill="#8884d8" dataKey="value" label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={theme.palette.background.paper} strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} calories`, ""]}
                    contentStyle={{
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: theme.shape.borderRadius,
                    }}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{
                      paddingTop: 20,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MealLog;
