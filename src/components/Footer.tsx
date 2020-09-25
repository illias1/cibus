import React from "react";
import Typography from "@material-ui/core/Typography";
import { Trans } from "react-i18next";
import { Box, useTheme } from "@material-ui/core";

type IFooterProps = {};

const Footer: React.FC<IFooterProps> = ({ ...props }) => {
  const theme = useTheme();

  return (
    <Box
      style={{
        textAlign: "center",
        fontSize: "15px",
        color: theme.palette.action.disabled,
        marginBottom: "3em",
      }}
    >
      {/* {t("powered_by")} */}
      <Trans i18nKey="powered_by">
        <Typography style={{ color: theme.palette.action.disabled }} align="center">
          This menu is powered by
        </Typography>
        {
          <a style={{ color: theme.palette.text.primary }} href="https://cibus.online/">
            <strong>cibus.online</strong>
          </a>
        }
      </Trans>
      {/* <Typography variant="subtitle2" paragraph={true} align="center">
        cibus.online
      </Typography> */}
      {/* <Typography
        style={{ marginBottom: "3em", color: theme.palette.action.disabled }}
        align="center"
      > */}
      <Trans i18nKey="cibus_check_more_info">
        Need an online menu for your establishment?
        {<br />}
        Check out
        {
          <a style={{ color: theme.palette.text.primary }} href="https://cibus.online/">
            cibus.online
          </a>
        }
        for more information
      </Trans>
      {<br />}
      Copyright © 2020. Cibus Online.
      {<br />}
      All rights Reserved.
      {/* </Typography> */}
    </Box>
  );
};

export default Footer;
