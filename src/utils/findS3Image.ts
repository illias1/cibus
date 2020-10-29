import { Storage } from "aws-amplify";

export const findS3Image = (
  img: string | null,
  sets3Url: React.Dispatch<React.SetStateAction<string>>
) => {
  if (img) {
    if (!img.includes("http")) {
      Storage.get(img)
        .then((url) => {
          if (typeof url === "string") {
            sets3Url(url as string);
          }
        })
        .catch((e) => console.log("error", e));
    } else {
      sets3Url(img);
    }
  } else {
    sets3Url("");
  }
};
