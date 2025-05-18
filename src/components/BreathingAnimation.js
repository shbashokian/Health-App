// Breathing Animation component

import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, Button, Slider } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { waterData } from "../data/fakeData";

const BreathingAnimation = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathDuration, setBreathDuration] = useState(4);
  const [cycle, setCycle] = useState(0);
  const [phase, setPhase] = useState("inhale"); // 'inhale', 'hold', 'exhale', 'rest'

  useEffect(() => {
    let timer;
    if (isBreathing) {
      timer = setInterval(() => {
        setPhase((current) => {
          switch (current) {
            case "inhale":
              return "hold";
            case "hold":
              return "exhale";
            case "exhale":
              return "rest";
            case "rest":
              setCycle((c) => c + 1);
              return "inhale";
            default:
              return "inhale";
          }
        });
      }, breathDuration * 1000);
    }
    return () => clearInterval(timer);
  }, [isBreathing, breathDuration]);

  const getCircleSize = () => {
    switch (phase) {
      case "inhale":
        return 200;
      case "hold":
        return 200;
      case "exhale":
        return 100;
      case "rest":
        return 100;
      default:
        return 100;
    }
  };

  const getPhaseText = () => {
    switch (phase) {
      case "inhale":
        return "Breathe In";
      case "hold":
        return "Hold";
      case "exhale":
        return "Breathe Out";
      case "rest":
        return "Rest";
      default:
        return "Ready";
    }
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Breathing Exercise
        </Typography>

        {/* Animation Circle */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: 320,
            mb: 3,
          }}
        >
          <motion.div
            animate={{
              scale: phase === "inhale" || phase === "hold" ? 1 : 0.5,
              opacity: 1,
            }}
            transition={{
              duration: breathDuration,
              ease: "easeInOut",
            }}
            style={{
              width: getCircleSize(),
              height: getCircleSize(),
              borderRadius: "50%",
              background: phase === "inhale" ? "linear-gradient(135deg, #42a5f5 0%, #7e57c2 100%)" : phase === "hold" ? "linear-gradient(135deg, #26c6da 0%, #66bb6a 100%)" : phase === "exhale" ? "linear-gradient(135deg, #ab47bc 0%, #42a5f5 100%)" : "linear-gradient(135deg, #b2dfdb 0%, #90caf9 100%)",
              boxShadow: "0 8px 32px 0 #42a5f555, 0 1.5px 8px 0 #7e57c255",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.5s",
            }}
          >
            <Typography variant="h3" color="#fff" fontWeight={700} sx={{ textShadow: "0 2px 8px #0002" }}>
              {getPhaseText()}
            </Typography>
          </motion.div>
        </Box>

        {/* Controls */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight={700}>
            Breath Duration: {breathDuration}s
          </Typography>
          <Slider
            value={breathDuration}
            onChange={(e, newValue) => setBreathDuration(newValue)}
            min={2}
            max={8}
            step={1}
            marks
            disabled={isBreathing}
            sx={{
              color: "#42a5f5",
              height: 8,
              "& .MuiSlider-thumb": {
                height: 24,
                width: 24,
                backgroundColor: "#fff",
                border: "2px solid #42a5f5",
              },
              "& .MuiSlider-track": {
                border: "none",
                background: "linear-gradient(90deg, #42a5f5 0%, #7e57c2 100%)",
              },
              "& .MuiSlider-rail": {
                opacity: 0.5,
                backgroundColor: "#bdbdbd",
              },
            }}
          />
        </Box>

        {/* Start/Stop Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            setIsBreathing(!isBreathing);
            if (!isBreathing) {
              setCycle(0);
              setPhase("inhale");
            }
          }}
          sx={{
            py: 1.5,
            fontWeight: 700,
            fontSize: 18,
            borderRadius: 3,
            background: isBreathing ? "linear-gradient(90deg, #ab47bc 0%, #42a5f5 100%)" : "linear-gradient(90deg, #42a5f5 0%, #26c6da 100%)",
            boxShadow: 3,
            transition: "background 0.2s",
            "&:hover": {
              background: isBreathing ? "linear-gradient(90deg, #42a5f5 0%, #ab47bc 100%)" : "linear-gradient(90deg, #26c6da 0%, #42a5f5 100%)",
              boxShadow: 6,
            },
          }}
        >
          {isBreathing ? "Stop" : "Start"} Breathing
        </Button>

        {/* Cycle Counter */}
        {isBreathing && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Box
              sx={{
                px: 3,
                py: 1,
                background: "linear-gradient(90deg, #b2dfdb 0%, #42a5f5 100%)",
                borderRadius: 3,
                boxShadow: 2,
                display: "inline-flex",
                alignItems: "center",
                fontWeight: 700,
                color: "#1976d2",
                fontSize: 18,
              }}
            >
              Cycle: {cycle}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default BreathingAnimation;
