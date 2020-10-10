import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import PanToolIcon from "@material-ui/icons/PanTool";
import { mutation } from "../utils/useMutation";
import { CreateStuffCallMutation, CreateStuffCallMutationVariables } from "../API";
import { ClickAwayListener, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setFeedback } from "../store/actions";
import { dataLayerPush } from "../utils/analytics";

type ICallStuffFabProps = {
  restaurantNameUrl: string;
  tableName: string;
};

const analyticsCallStaff = (event: string, success: number) => {
  dataLayerPush({
    event,
    // success - 1; error- 0
    callStaffSuccess: success,
  });
};

export const createStuffCall = /* GraphQL */ `
  mutation CreateStuffCall(
    $input: CreateStuffCallInput!
    $condition: ModelStuffCallConditionInput
  ) {
    createStuffCall(input: $input, condition: $condition) {
      propertyName
      tableName
      createdAt
    }
  }
`;

const CallStuffFab: React.FC<ICallStuffFabProps> = ({ restaurantNameUrl, tableName }) => {
  const [sureToCall, setsureToCall] = React.useState<boolean>(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClick = async () => {
    if (sureToCall) {
      const { data, error } = await mutation<
        CreateStuffCallMutation,
        CreateStuffCallMutationVariables
      >(createStuffCall, {
        input: {
          propertyName: restaurantNameUrl,
          tableName,
        },
      });
      setsureToCall(false);
      if (data?.createStuffCall) {
        dispatch(
          setFeedback({
            open: true,
            message: t("stuff_has_been_called"),
            duration: 1000,
          })
        );
        analyticsCallStaff("callStaff", 1);
      } else {
        dispatch(
          setFeedback({
            open: true,
            message: t("stuff_call_error"),
            duration: 3000,
          })
        );
        analyticsCallStaff("callStaff", 0);
      }
    } else {
      setsureToCall(true);
    }
  };
  const classes = useStyles();
  return (
    <ClickAwayListener onClickAway={() => setsureToCall(false)}>
      <Fab
        className={classes.CallStuffFab}
        onClick={handleClick}
        color="secondary"
        variant={sureToCall ? "extended" : "round"}
        aria-label="add"
      >
        <PanToolIcon className={sureToCall ? classes.extendedIcon : ""} />
        {sureToCall && <Typography>{t("call_stuff")}</Typography>}
      </Fab>
    </ClickAwayListener>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    CallStuffFab: {
      position: "fixed",
      bottom: "9px",
      right: "12px",
      zIndex: 2,
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

export default CallStuffFab;
