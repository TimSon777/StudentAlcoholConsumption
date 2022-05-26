import React, { useContext } from "react";
import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PredictionContext } from "../contexts/prediction.context";

export const Header = () => {
  const { prediction } = useContext(PredictionContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Stack spacing={3} direction={"row"}>
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

            <Button variant="text" component={Link} to={"/"}>
              Survey
            </Button>
            {!!prediction && (
              <Button variant="text" component={Link} to={"/result"}>
                Result
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
