"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::transaction.transaction",
  ({ strapi }) => ({
    // Include the default core controller actions
    ...createCoreController("api::transaction.transaction"),

    // Your custom controller action
    async findInvoicesByClient(ctx) {
      const { clientId } = ctx.params;

      if (!clientId) {
        return ctx.badRequest("Client ID is missing");
      }

      try {
        const knex = strapi.db.connection; // Accessing the knex instance directly

        const invoices = await knex("invoice_masters")
          .join(
            "invoice_masters_client_links",
            "invoice_masters.id",
            "=",
            "invoice_masters_client_links.invoice_master_id"
          )
          .join(
            "companies",
            "invoice_masters_client_links.company_id",
            "=",
            "companies.id"
          )
          .where("companies.id", clientId)
          .select(
            "invoice_masters.invoice_no",
            "invoice_masters.subject",
            "invoice_masters.date"
          );

        return (ctx.body = invoices.map((invoice) => ({
          ...invoice,
          date: invoice.date ? new Date(invoice.date).toISOString() : null, // Formatting the date
        })));
      } catch (err) {
        strapi.log.error("findInvoicesByClient error:", err);
        return ctx.internalServerError("Unable to fetch invoices");
      }
    },
  })
);
