"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::journal.journal", ({ strapi }) => ({
  // Include the default core controller actions
  ...createCoreController("api::journal.journal"),

  // Custom controller action to find journals by multiple credit account ids and between two dates
  async findRevenueJournalByRevenueIdAndDate(ctx) {
    const { revenueId } = ctx.params;

    console.log("revenueId:", revenueId);

    try {
      const knex = strapi.db.connection; // Accessing the knex instance directly

      const journals = await knex.raw(`
        SELECT journals.*, individual_accounts.*, journals_credit_account_links.*
        FROM journals
        JOIN journals_credit_account_links ON journals.id = journals_credit_account_links.journal_id
        JOIN individual_accounts ON journals_credit_account_links.individual_account_id = individual_accounts.id
        WHERE individual_accounts.id IN (${revenueId})
        `);
      // AND journals.date BETWEEN '2024-05-01' AND '2024-05-07'

      console.log("journals:", journals[0]);

      return journals[0];
    } catch (err) {
      strapi.log.error("findJournalsByCreditAccountsAndDateRange error:", err);
      return ctx.internalServerError("Unable to fetch journals");
    }
  },

  async findExpenseJournalByExpenseIdAndDate(ctx) {
    const { expenseIds } = ctx.params;

    console.log("expenseIds:", expenseIds);

    try {
      const knex = strapi.db.connection; // Accessing the knex instance directly

      const journals = await knex.raw(`
        SELECT journals.*, individual_accounts.*, journals_debit_account_links.*
        FROM journals
        JOIN journals_debit_account_links ON journals.id = journals_debit_account_links.journal_id
        JOIN individual_accounts ON journals_debit_account_links.individual_account_id = individual_accounts.id
        WHERE individual_accounts.id IN (${expenseIds})
        `);
      // AND journals.date BETWEEN '2024-05-01' AND '2024-05-07'

      console.log("journals:", journals[0]);

      return journals[0];
    } catch (err) {
      strapi.log.error("findJournalsByDebitAccountsAndDateRange error:", err);
      return ctx.internalServerError("Unable to fetch journals");
    }
  },
}));
