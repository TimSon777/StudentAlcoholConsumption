import React, { useState } from "react";
import { Card, CardContent, Popover, Typography } from "@mui/material";

type Props = {
  title: string;
  value: string | number;
  hoverText: string;
};

export default function InfoCard({ title, value, hoverText }: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Card
      variant="outlined"
      aria-owns={open ? "mouse-over-popover" : undefined}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <CardContent>
        <Typography
          variant={"h4"}
          component={"div"}
          color="primary"
          gutterBottom
        >
          {title}
        </Typography>

        <Typography component={"div"} variant={"h1"} textAlign={"end"}>
          {value}
        </Typography>
      </CardContent>

      <Popover
        id="mouse-over-popover"
        sx={{
          mt: 1,
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }} variant={"h5"}>
          {hoverText}
        </Typography>
      </Popover>
    </Card>
  );
}
