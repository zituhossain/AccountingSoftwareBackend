"use strict";

/**
 * mail router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::mail.mail");
module.exports = {
  routes: [
    {
      method: "POST",
      path: "/mails",
      handler: "mail.sendQuotation",
      config: {
        policies: [],
      },
    },
  ],
};
