import * as ghpages from "gh-pages";

ghpages.publish("dist", {
  repo: "https://github.com/pkground/dist-contents",
});