import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import Routes from "../App/Routes";
import { Helmet } from "react-helmet";
import sitemap from "./sitemap";
import robots from "./robots";
import manifest from "./manifest";
import { Provider } from "react-redux";
import { flushChunkNames } from "react-universal-component/server";
import flushChunks from "webpack-flush-chunks";
import extractLocalesFromReq from "../client-locale/extractLocalesFromReq";
import guessLocale from "../client-locale/guessLocale";
import createReduxStore from "../redux";
const store = createReduxStore({ server: true });

export default ({ clientStats }) => (req, res) => {
  const userLocales = extractLocalesFromReq(req);
  let lang = guessLocale(["en", "id"], userLocales, "id");

  if (req.originalUrl.substr(1, 2) == "en") {
    lang = "en";
  }

  if (req.originalUrl.substr(1, 2) == "id") {
    lang = "id";
  }

  const context = {};
  const app = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <Routes context={context} />
      </StaticRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic();

  const { js, styles, cssHash } = flushChunks(clientStats, {
    chunkNames: flushChunkNames()
  });

  const status = context.status || 200;

  if (context.status == 404) {
    console.log("Error 404: ", req.originalUrl);
  }

  if (req.url == "/sitemap.xml") {
    return res
      .header("Content-Type", "application/xml")
      .status(status)
      .send(sitemap);
  }

  if (req.url == "/robots.txt" || req.url == "/Robots.txt") {
    return res
      .header("Content-Type", "text/plain")
      .status(status)
      .send(robots);
  }

  if (req.url == "/manifest.json" || req.url == "/Manifest.json") {
    return res
      .header("Content-Type", "application/manifest+json")
      .status(status)
      .send(manifest);
  }

  res.setHeader("Cache-Control", "public, max-age=2628000");

  res.status(status).send(
    `<!doctype html><html lang="${lang}" ${helmet.htmlAttributes.toString()}><head><link rel="manifest" href="./manifest.json"/>
			${styles}${
      helmet.title
    }${helmet.meta.toString()}${helmet.link.toString()}</head><body><div id="react-root">${app}</div>${js}${cssHash}</body></html>`
  );
};
