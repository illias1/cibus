import React from "react";
import { makeStyles, Theme, createStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Scrollspy from "react-scrollspy";

type ICategoriesSliderProps = {
  categories: string[];
};

const CategoriesSlider: React.FC<ICategoriesSliderProps> = ({ categories }) => {
  const classes = useStyles();
  const theme = useTheme();
  React.useEffect(() => {
    window.document.documentElement.style.setProperty(
      "--color-text",
      theme.palette.primary.contrastText
    );
    window.document.documentElement.style.setProperty(
      "--color-background",
      theme.palette.action.selected
    );
  }, [
    theme.palette.action.selected,
    theme.palette.primary.contrastText,
    theme.palette.primary.main,
  ]);

  const [clicked, setclicked] = React.useState<boolean>(false);
  return (
    <Box id="categoriesContainer" className={classes.root}>
      <Scrollspy
        items={categories.map((cat) => `category-${cat}`)}
        currentClassName="activeCategoryClass"
        componentTag="div"
        offset={100}
        onUpdate={(item) => {
          if (((item as unknown) as HTMLAnchorElement) && !clicked) {
            const leftOffset = document.getElementById(
              `label-${((item as unknown) as HTMLAnchorElement).id}`
            )?.offsetLeft!;
            document.getElementById("categoriesContainer")!.scrollLeft = +leftOffset - 50;
          }
        }}
      >
        {categories.map((cat, i) => (
          <a
            id={`label-category-${cat}`}
            key={i}
            className={classes.chip}
            href={`#category-${cat}`}
            // needed to actually scroll sincr the onUpdate method would block it
            onClick={() => {
              setclicked(true);
              setTimeout(() => {
                setclicked(false);
              }, 2000);
            }}
          >
            {cat}
          </a>
        ))}
      </Scrollspy>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      whiteSpace: "nowrap",
      overflow: "auto",
      boxShadow: "0px 5px 30px #0000000D",
      padding: theme.spacing(3),
      borderBottomRightRadius: theme.spacing(6),
      borderBottomLeftRadius: theme.spacing(6),
      position: "sticky",
      top: 0,
      backgroundColor: theme.palette.background.paper,
    },
    chip: {
      marginRight: theme.spacing(3),
      color: theme.palette.text.disabled,
      fontSize: theme.typography.h6.fontSize,
    },
  })
);

export default CategoriesSlider;
