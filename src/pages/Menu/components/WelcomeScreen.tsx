import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";
import { StyledInput } from "../../../components/Input";
import { useDispatch } from "react-redux";
import { setUserName } from "../../../store/actions";
import { TParams } from "../../../types";
import background from "../../../assets/background.png";
type IMenuProps = {};

const Menu: React.FC<IMenuProps> = ({ ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setname] = React.useState<string>("");
  let { tableName } = useParams<TParams>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setUserName(name));
  };
  return (
    <Container
      style={{
        background: `linear-gradient(0deg, #000000 0%, #080808 18%, #2D2D2D69 100%), url(${background}) no-repeat center`,
      }}
    >
      <Box className={classes.main}>
        <Typography className={classes.title} variant="h4" component="h1">
          cibus.online
        </Typography>
        <Box className={classes.bottom}>
          <Typography variant="subtitle1" className={classes.aboveFormText}>
            Our guest this evening is:
          </Typography>
          <form onSubmit={handleSubmit}>
            <StyledInput placeholder="Name" onChange={(e) => setname(e.target.value)} />
          </form>
          <Typography variant="subtitle1" className={classes.text}>
            We need your name to personalize your order and keep track of the tab.
          </Typography>
          <div className={classes.divider} />
          <Typography variant="subtitle1" className={classes.text}>
            Table #{tableName}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginTop: theme.spacing(8),
      color: "white",
    },
    main: {
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      justifyContent: "space-between",
    },
    bottom: {
      marginBottom: theme.spacing(4),
    },
    text: {
      color: "white",
      marginTop: theme.spacing(2),
    },
    divider: {
      width: "50%",
      border: "1px solid white",
      margin: `${theme.spacing(1)}px auto`,
    },
    aboveFormText: {
      color: theme.palette.common.white,
      marginBottom: theme.spacing(2),
      fontSize: 16,
    },
  })
);

export default Menu;
