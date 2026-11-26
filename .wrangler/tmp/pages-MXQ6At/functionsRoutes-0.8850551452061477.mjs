import { onRequestGet as __api_downloads_js_onRequestGet } from "/home/user/qh-software/functions/api/downloads.js"
import { onRequestGet as __books__file__js_onRequestGet } from "/home/user/qh-software/functions/books/[file].js"

export const routes = [
    {
      routePath: "/api/downloads",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_downloads_js_onRequestGet],
    },
  {
      routePath: "/books/:file",
      mountPath: "/books",
      method: "GET",
      middlewares: [],
      modules: [__books__file__js_onRequestGet],
    },
  ]