import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@material-ui/core";
import { TMenuComponentTranslated } from "../types";
import { priceDisplay } from "../pages/Menu/utils";
import { Currency } from "../API";
import { TComponentChoice } from "../pages/Menu/components/ItemPopup";
import { Controller } from "react-hook-form";

// const RadioGroup: React.FC<TRadioGroup> = ({ label, name, options, inputRef }) => {
//   return (
//     <>
//       <Typography style={{ marginLeft: 27 }} component="legend" variant="h6">
//         {label}
//       </Typography>
//       <div>
//         {options.map(({ label: optionLabel, value }, index) => {
//           return (
//             <div key={index}>
//               <input id={index.toString()} name={name} type="radio" value={value} ref={inputRef} />
//               <label htmlFor={index.toString()}>
//                 <span>{optionLabel}</span>
//               </label>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };

type TRadioGroup = {
  label: string;
  name: string;
  inputRef: any;
  options: {
    label: string;
    value: string;
  }[];
};

const MenuComponent: React.FC<
  TMenuComponentTranslated & {
    currency: Currency;
    control: any;
  }
> = ({ id, translations, currency, control }) => {
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
          defaultValue={"0"}
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
