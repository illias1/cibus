import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LanguageIcon from "@material-ui/icons/Language";
import { useTranslation } from "react-i18next";
import IconButton from "@material-ui/core/IconButton";
import { MenuItem, Menu } from "@material-ui/core";
import { Language } from "../API";
import { useDispatch } from "react-redux";
import { setupMenu } from "../store/actions";
import { useTypedSelector } from "../store/types";

export default function SimplePopover() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<(EventTarget & HTMLButtonElement) | null>(null);
  const { i18n } = useTranslation();
  const { originalMenuItemList } = useTypedSelector((state) => state.menu);
  const dispatch = useDispatch();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSwitch = (lang: Language) => {
    i18n.changeLanguage(lang);
    dispatch(
      setupMenu({
        payload: {
          __typename: "ModelMenuItemConnection" as const,
          items: originalMenuItemList,
          nextToken: "",
        },
        currentLang: lang,
      })
    );
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton className={classes.icon} size="small" onClick={handleClick}>
        <LanguageIcon />
      </IconButton>
      <Menu
        classes={{
          paper: classes.popover,
        }}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem dense={true} onClick={() => handleSwitch(Language["es"])}>
          Español
        </MenuItem>
        <MenuItem dense={true} onClick={() => handleSwitch(Language["en"])}>
          English
        </MenuItem>
        <MenuItem dense={true} onClick={() => handleSwitch(Language["ko"])}>
          한국어
        </MenuItem>
      </Menu>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  popover: {
    marginTop: 35,
    borderRadius: 15,
  },
}));
