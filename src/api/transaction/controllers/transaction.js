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
            "invoice_masters.date",
            "invoice_masters.total_amount",
            "invoice_masters.id"
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

    async findQuotationsByClient(ctx) {
      const { clientId } = ctx.params;

      if (!clientId) {
        return ctx.badRequest("Client ID is missing");
      }

      try {
        const knex = strapi.db.connection; // Accessing the knex instance directly

        const quotations = await knex("quotations")
          .join(
            "quotations_client_links",
            "quotations.id",
            "=",
            "quotations_client_links.quotation_id"
          )
          .join(
            "companies",
            "quotations_client_links.company_id",
            "=",
            "companies.id"
          )
          .where("companies.id", clientId)
          .select(
            "quotations.quotation_no",
            "quotations.subject",
            "quotations.date",
            "quotations.client_rate",
            "quotations.id"
          );

        return (ctx.body = quotations.map((quotation) => ({
          ...quotation,
          date: quotation.date ? new Date(quotation.date).toISOString() : null, // Formatting the date
        })));
      } catch (err) {
        strapi.log.error("findQuotationsByClient error:", err);
        return ctx.internalServerError("Unable to fetch quotations");
      }
    },

    async sumPaidAmounts(ctx) {
      const { invoiceId } = ctx.params;

      try {
        const knex = strapi.db.connection;

        // Calculate the sum of paid_amounts for the specified invoice ID
        const result = await knex("transactions")
          .join(
            "transactions_invoice_id_links",
            "transactions.id",
            "=",
            "transactions_invoice_id_links.transaction_id"
          )
          .where("transactions_invoice_id_links.invoice_master_id", invoiceId)
          .sum("transactions.paid_amount as totalPaid")
          .first();

        return ctx.send({ totalPaid: result.totalPaid || 0 });
      } catch (error) {
        strapi.log.error("Failed to calculate sum of paid amounts:", error);
        return ctx.badRequest("An error occurred during calculation.");
      }
    },
  })
);
