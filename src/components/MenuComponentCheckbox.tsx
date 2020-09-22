import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Typography,
} from "@material-ui/core";
import { TMenuComponentTranslated } from "../types";
import { priceDisplay } from "../pages/Menu/utils";
import { Currency } from "../API";
import { TComponentChoice } from "../pages/Menu/components/ItemPopup";
import { useTranslation } from "react-i18next";
import { setFeedback } from "../store/actions";
import { useDispatch } from "react-redux";
import { DeepMap, FieldError } from "react-hook-form";

const MenuComponent: React.FC<
  TMenuComponentTranslated & {
    currency: Currency;
    register: any;
    errors: DeepMap<Record<string, number | boolean[]>, FieldError>;
    getValues: any;
  }
> = ({ id, translations, restrictions, currency, register, errors, getValues }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [error, seterror] = React.useState<boolean>(false);
  React.useEffect(() => {
    console.log("errrs", errors);
    if (errors[id]) {
      seterror(true);
    } else {
      seterror(false);
    }
  }, [errors]);
  const restrictionsCheck = () => {
    const checkedLength = (getValues(
      translations.optionChoice.map((_, index) => `${id}[${index}]`)
    )[id] as boolean[]).filter((value) => value).length;
    if (restrictions?.exact && restrictions.exact !== checkedLength) {
      return false;
    } else if (restrictions?.max && restrictions.max < checkedLength) {
      return false;
    }
    return true;
  };
  return (
    <Box className={classes.root}>
      <FormControl error={error} component="fieldset">
        <Typography className={classes.textAligned} component="legend" variant="h6">
          {translations.label}
        </Typography>
        {restrictions?.max ? (
          <FormHelperText className={classes.textAligned}>
            {t("menu_comp_helper_max_number", { number: restrictions.max })}
          </FormHelperText>
        ) : null}
        {restrictions?.exact ? (
          <FormHelperText className={classes.textAligned}>
            {t("menu_comp_helper_exact_number", { number: restrictions.exact })}
          </FormHelperText>
        ) : null}
        {translations.optionChoice.map(({ addPrice, name }, index) => (
          <FormControlLabel
            key={name}
            classes={
              {
                // label: thisComponentState[index] ? classes.labelActive : classes.labelPassive,
              }
            }
            control={
              <Checkbox
                // value={(thisComponentState[index] as unknown) as string}
                color="primary"
                inputRef={register({ validate: restrictionsCheck })}
                defaultChecked={false}
                name={`${id}[${index}]`}
                // checked={thisComponentState[index]}
                // onChange={() => handleChange(index)}
              />
            }
            label={`${name} - ${priceDisplay(currency, addPrice || 0, translations.language)}`}
          />
        ))}
      </FormControl>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 15,
    },
    labelActive: {
      fontWeight: theme.typography.fontWeightBold,
    },
    labelPassive: {
      opacity: 0.5,
    },
    textAligned: { marginLeft: 27 },
  })
);

export default React.memo(MenuComponent);
