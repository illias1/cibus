import { Storage } from "aws-amplify";

export const findS3Image = (
  img: string | null,
  sets3Url: React.Dispatch<React.SetStateAction<string>>
) => {
  if (img) {
    if (!img.includes("http")) {
      console.log("image ", img);
      Storage.get(img)
        .then((url) => {
          console.log("img after url", img);
          console.log("url after search", url);
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
