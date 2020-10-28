import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@material-ui/core";
import { TMenuComponentTranslated } from "../types";
import { Currency } from "../API";
import { TComponentChoice } from "../pages/Menu/components/ItemPopup";
import { Controller, useWatch } from "react-hook-form";
import { priceDisplay } from "../utils/priceDisplay";

const MenuComponent: React.FC<
  TMenuComponentTranslated & {
    currency: Currency;
    control: any;
    defaultValue: string;
    setfoundCompAddPrice: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  }
> = ({ id, translations, currency, control, defaultValue, setfoundCompAddPrice }) => {
  const classes = useStyles();
  const watchChoice = useWatch({
    control,
    name: id, // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    defaultValue: 0, // default value before the render
  }) as number;
  React.useEffect(() => {
    setfoundCompAddPrice((prev) => ({
      ...prev,
      [id]: translations?.optionChoice[watchChoice].addPrice || 0,
    }));
  }, [watchChoice]);
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
