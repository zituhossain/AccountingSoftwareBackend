module.exports = {
  routes: [
    {
      // Custom route for finding invoices by client
      method: "GET",
      path: "/journals/revenue/:revenueId",
      handler: "journal.findRevenueJournalByRevenueIdAndDate",
      config: {
        auth: false,
      },
    },
    {
      // Custom route for finding invoices by client
      method: "GET",
      path: "/journals/expense/:expenseIds",
      handler: "journal.findExpenseJournalByExpenseIdAndDate",
      config: {
        auth: false,
      },
    },
  ],
};
