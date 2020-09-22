import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

type IButtonProps = {
  color?: "inherit" | "primary" | "secondary" | "default" | undefined;
  onCLick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  disabled?: boolean;
  className?: string;
  type?: "button" | "reset" | "submit" | undefined;
};

export const StyledButton: React.FC<IButtonProps> = ({
  children,
  onCLick,
  color = "primary",
  disabled = false,
  className,
  type,
}) => {
  const classes = useStyles();
  return (
    <>
      <Button
        className={`${classes.root} ${className}`}
        color={color}
        variant="contained"
        onClick={onCLick}
        disabled={disabled}
        type={type}
      >
        {children}
      </Button>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: theme.spacing(6),
      textTransform: "none",
      padding: "6px 5px",
    },
  })
);
