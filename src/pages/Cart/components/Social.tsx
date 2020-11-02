import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import { Grid, Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

type ISocialProps = {
  facebook: string | null | undefined;
  instagram: string | null | undefined;
  restName: string;
};

const Social: React.FC<ISocialProps> = ({ facebook, instagram, restName }) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="subtitle1" align="center">
        Check and share <strong> {restName.toUpperCase()} </strong> on
      </Typography>

      <Grid spacing={4} style={{ marginBottom: 0 }} container justify="center">
        {facebook !== null && facebook !== undefined && facebook.length > 0 && (
          <Grid item>
            <Link
              variant="button"
              target="blank"
              href={isMobile ? `fb://page/${facebook}` : `https://www.facebook.com/${facebook}`}
            >
              <FacebookIcon />
            </Link>
          </Grid>
        )}
        {instagram !== null && instagram !== undefined && instagram.length > 0 && (
          <Grid item>
            <Link variant="button" target="blank" href={`https://instagram.com/${instagram}`}>
              <InstagramIcon />
            </Link>
          </Grid>
        )}
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

export default Social;
