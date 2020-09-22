import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Typography, Divider, Button, TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { LOCAL_STORAGE_CUSTOMER_NAME } from "../../../utils/_constants";

type IConfrimationPopupProps = {
  message: string;
  onConfirmationClick: SubmitHandler<{ customerName: string }>;
  open: boolean;
  handleClose: () => void;
};

const ConfrimationPopup: React.FC<IConfrimationPopupProps> = ({
  open,
  handleClose,
  onConfirmationClick,
  message,
}) => {
  const { register, handleSubmit } = useForm<{ customerName: string }>({});
  const classes = useStyles();
  const { t } = useTranslation();
  const body = (
    <div className={classes.paper}>
      <Typography variant="subtitle2">{message}</Typography>
      <Divider />
      <div className={classes.divider} />
      <form className={classes.form} onSubmit={handleSubmit(onConfirmationClick)}>
        <TextField
          inputProps={{ style: { textAlign: "center" } }}
          name="customerName"
          inputRef={register}
          placeholder={t("input_your_name")}
          defaultValue={localStorage.getItem(LOCAL_STORAGE_CUSTOMER_NAME)}
        />
        <Button type="submit" className={classes.button}>
          {t("general_confirm")}
        </Button>
      </form>
    </div>
  );
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="confirmation-modal"
      aria-describedby="confirmation-modal"
    >
      {body}
    </Modal>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: {
      borderTop: "2px solid #BAC0CB",
      borderTopColor: theme.palette.text.secondary,
      width: "100%",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.spacing(4),
      padding: theme.spacing(6, 2, 3),
      boxSizing: "border-box",
      margin: "-115px 0 0 -45%",
      top: "50%",
      left: "50%",
      width: "90%",
      height: "234px",
      position: "absolute",
      textAlign: "center",
      display: "flex",
      justifyContent: "space-evenly",
      flexDirection: "column",
      alignItems: "center",
      "&:focus": {
        outline: "none",
      },
    },

    button: {
      textTransform: "none",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
  })
);

export default ConfrimationPopup;
