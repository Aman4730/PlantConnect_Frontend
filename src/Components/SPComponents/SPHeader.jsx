import React from "react";
import { Button, Card, Grid } from "@mui/material";

const SPHeader = ({
  labelA,
}) => {
  return (
    <Grid
      container
      style={{
        display: "flex",
        alignItems: "end",
        justifyContent: "space-between",
      }}
      mb={-3}
    >
      <Grid item lg={6} sm={6} xs={12}>
        <Card className="Sp-CardHeading">
          {labelA === "Total LRPs"
            ? "LRPs wise detailed report"
            : labelA === "Total FIGs"
            ? "FIGs wise detailed report"
            : "FPOs wise detailed report"}
        </Card>
      </Grid>
    </Grid>
  );
};

export default SPHeader;
