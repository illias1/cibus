import { GetPropertyQueryForCart } from "../pages/Cart/graphql";
import { Dispatch } from "react";
import { setFeedback, setValid } from "../store/actions";
import { TFunction } from "i18next";
import { GetPropertyQuery } from "../API";

export const validateOpeningAndTable = (
  urlTable: string,
  data: GetPropertyQueryForCart | GetPropertyQuery,
  dispatch: Dispatch<any>,
  t: TFunction
) => {
  const tableCorrect = data!.getProperty!.tables.includes(urlTable);
  const restaurantOpen = data!.getProperty!.open;
  if (!tableCorrect) {
    dispatch(
      setFeedback({
        open: true,
        message: t("feedback_table_number_is_wrong"),
        duration: null,
      })
    );
  }
  if (!restaurantOpen) {
    dispatch(
      setFeedback({
        open: true,
        message: t("feedback_is_closed", { name: "rest" }),
        duration: null,
      })
    );
  }
  dispatch(setValid(tableCorrect && restaurantOpen));
};
