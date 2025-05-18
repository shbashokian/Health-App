// Fake data for development and testing

export const moodData = {
  emojis: ["😊", "😐", "😢", "😡", "😴", "😍", "😰", "😎"],
  colors: {
    happy: "#4CAF50",
    neutral: "#FFC107",
    sad: "#2196F3",
    angry: "#F44336",
    tired: "#9C27B0",
    excited: "#FF9800",
    anxious: "#795548",
    cool: "#607D8B",
  },
  history: [
    { date: "2024-05-18", mood: "happy", note: "Had a great day!" },
    { date: "2024-05-17", mood: "neutral", note: "Regular day" },
    { date: "2024-05-16", mood: "sad", note: "Feeling down" },
  ],
};

export const waterData = {
  dailyGoal: 2000, // ml
  cupSizes: [100, 200, 300, 500], // ml
  history: [
    { date: "2024-05-18", amount: 1800 },
    { date: "2024-05-17", amount: 2200 },
    { date: "2024-05-16", amount: 1500 },
  ],
};

export const mealData = {
  meals: [
    { id: 1, name: "Breakfast", calories: 350 },
    { id: 2, name: "Lunch", calories: 550 },
    { id: 3, name: "Dinner", calories: 650 },
    { id: 4, name: "Snack", calories: 200 },
  ],
  history: [
    { date: "2024-05-18", meals: [350, 550, 650, 200], total: 1750 },
    { date: "2024-05-17", meals: [300, 600, 700, 150], total: 1750 },
    { date: "2024-05-16", meals: [400, 500, 600, 250], total: 1750 },
  ],
};

export const sleepData = {
  history: [
    { date: "2024-05-18", hours: 7.5, quality: "good" },
    { date: "2024-05-17", hours: 6.5, quality: "fair" },
    { date: "2024-05-16", hours: 8.0, quality: "excellent" },
  ],
};

export const fitnessData = {
  exercises: [
    { id: 1, name: "Push-ups", sets: 3, reps: 15, duration: 0 },
    { id: 2, name: "Squats", sets: 3, reps: 20, duration: 0 },
    { id: 3, name: "Plank", sets: 3, reps: 0, duration: 60 },
    { id: 4, name: "Running", sets: 1, reps: 0, duration: 1800 },
  ],
  history: [
    { date: "2024-05-18", completed: [1, 2, 3] },
    { date: "2024-05-17", completed: [1, 2, 4] },
    { date: "2024-05-16", completed: [1, 2, 3, 4] },
  ],
};

export const stretchData = {
  sequences: [
    {
      id: 1,
      name: "Morning Stretch",
      duration: 600, // 10 minutes
      description: "Perfect way to start your day",
    },
    {
      id: 2,
      name: "Office Break",
      duration: 300, // 5 minutes
      description: "Quick stretches for desk workers",
    },
    {
      id: 3,
      name: "Evening Relaxation",
      duration: 900, // 15 minutes
      description: "Wind down before bed",
    },
  ],
  exercises: [
    {
      id: 1,
      name: "Neck Rolls",
      duration: 60,
      description: "Gently roll your neck in circles",
    },
    {
      id: 2,
      name: "Shoulder Stretch",
      duration: 45,
      description: "Cross one arm over chest and hold",
    },
    {
      id: 3,
      name: "Cat-Cow Stretch",
      duration: 90,
      description: "Alternate between arching and rounding your back",
    },
    {
      id: 4,
      name: "Child's Pose",
      duration: 60,
      description: "Kneel and stretch forward with arms extended",
    },
    {
      id: 5,
      name: "Hip Flexor Stretch",
      duration: 45,
      description: "Lunge forward with one leg",
    },
    {
      id: 6,
      name: "Hamstring Stretch",
      duration: 60,
      description: "Sit and reach for your toes",
    },
  ],
};

export const mentalHealthData = {
  tags: ["Anxiety", "Stress", "Gratitude", "Goals", "Reflection"],
  history: [
    { date: "2024-05-18", mood: "happy", tags: ["Gratitude", "Goals"], entry: "Feeling productive today!" },
    { date: "2024-05-17", mood: "neutral", tags: ["Reflection"], entry: "Need to work on time management." },
    { date: "2024-05-16", mood: "anxious", tags: ["Anxiety", "Stress"], entry: "Feeling overwhelmed with work." },
  ],
};

export const weightData = {
  history: [
    { date: "2024-05-18", weight: 70.5 },
    { date: "2024-05-17", weight: 70.8 },
    { date: "2024-05-16", weight: 71.0 },
  ],
  goal: 68.0,
};

export const healthData = {
  vitals: {
    heartRate: [72, 75, 68, 70, 73],
    bloodPressure: [
      [120, 80],
      [118, 78],
      [122, 82],
      [119, 79],
      [121, 81],
    ],
    steps: [8500, 9200, 7800, 8900, 9500],
    calories: [2100, 1950, 2200, 2050, 1900],
  },
  lastSync: "2024-05-18T15:30:00Z",
};
