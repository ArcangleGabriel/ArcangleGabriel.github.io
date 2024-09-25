import { Button, TextField } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";

export function PasswordProtect({ children }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef(null); // Ref to manage focus on TextField

  const handleSubmit = () => {
    if (password === "and my axe") {
      setError(false);
      setSubmitted(true);
    } else {
      setError(true);
      setSubmitted(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else {
      setPassword(e.target.value);
    }
  };

  useEffect(() => {
    // Focus on the input field when component mounts or password state changes
    if (!submitted) {
      inputRef.current.focus();
    }
  }, [submitted]);

  if (submitted && password === "and my axe") {
    return children;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        position: "fixed",
        width: "100%",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <h1
          style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: 20 }}
        >
          Password Protected
        </h1>
        {!submitted && (
          <>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
              error={error}
              helperText={error ? "Incorrect password" : ""}
              sx={{ marginBottom: 20 }}
              inputRef={inputRef} // Assign the inputRef to manage focus
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </>
        )}
        {submitted && password === "and my axe" && children}
      </Box>
    </Box>
  );
}
