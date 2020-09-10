import React from "react";
import Typography from "@material-ui/core/Typography";
import { Trans } from "react-i18next";
import { useTheme } from "@material-ui/core";

type IFooterProps = {};

const Footer: React.FC<IFooterProps> = ({ ...props }) => {
  const theme = useTheme();

  return (
    <>
      <Typography style={{ color: theme.palette.action.disabled }} align="center">
        {/* {t("powered_by")} */}
        <Trans i18nKey="powered_by">This menu is powered by {<strong>cibus.online</strong>}</Trans>
      </Typography>
      {/* <Typography variant="subtitle2" paragraph={true} align="center">
        cibus.online
      </Typography> */}
      <Typography
        style={{ marginBottom: "3em", color: theme.palette.action.disabled }}
        align="center"
      >
        <Trans i18nKey="cibus_check_more_info">
          Check
          {<a style={{ color: theme.palette.text.primary }} href="https://cibus.online/"></a>}
          for more information
        </Trans>
        {<br />}
        Copyright © 2020. Cibus Online.
        {<br />}
        All rights Reserved.
      </Typography>
    </>
  );
};

export default Footer;
