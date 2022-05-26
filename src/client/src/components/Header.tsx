import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: "inline-block" }}>
            <Typography
              component={Link}
              to={"/"}
              noWrap
              variant="h6"
              sx={{
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Student alcohol consumptions
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
