import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@material-ui/core";
import { TMenuComponentTranslated } from "../types";
import { Currency } from "../API";
import { TComponentChoice } from "../pages/Menu/components/ItemPopup";
import { Controller } from "react-hook-form";
import { priceDisplay } from "../utils/priceDisplay";

const MenuComponent: React.FC<
  TMenuComponentTranslated & {
    currency: Currency;
    control: any;
    defaultValue: string;
  }
> = ({ id, translations, currency, control, defaultValue }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <FormControl component="fieldset">
        <Typography className={classes.textAligned} component="legend" variant="h6">
          {translations.label}
        </Typography>
        <Controller
          name={id}
          rules={{ required: true }}
          defaultValue={defaultValue}
          control={control}
          as={
            <RadioGroup defaultValue="" aria-label="gender">
              {translations.optionChoice.map((choice, index) => (
                <FormControlLabel
                  key={index}
                  value={index.toString()}
                  control={<Radio color="primary" />}
                  label={`${choice.name} - ${priceDisplay(
                    currency,
                    choice.addPrice || 0,
                    translations.language
                  )}`}
                />
              ))}
            </RadioGroup>
          }
        />
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

export default MenuComponent;
