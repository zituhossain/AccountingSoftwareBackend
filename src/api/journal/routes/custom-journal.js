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
    {
      // Custom route for finding invoices by client
      method: "GET",
      path: "/journals/currentAsset/:expenseIds",
      handler: "journal.findCurrentAssetJournalByExpenseIdAndDate",
      config: {
        auth: false,
      },
    },
    {
      // Custom route for finding invoices by client
      method: "GET",
      path: "/journals/fixedAsset/:expenseIds",
      handler: "journal.findFixedAssetJournalByExpenseIdAndDate",
      config: {
        auth: false,
      },
    },
    {
      // Custom route for finding invoices by client
      method: "GET",
      path: "/journals/currentLiabilities/:expenseIds",
      handler: "journal.findCurrentLiabilitiesJournalByExpenseIdAndDate",
      config: {
        auth: false,
      },
    },
    {
      // Custom route for finding invoices by client
      method: "GET",
      path: "/journals/FixedLiabilities/:expenseIds",
      handler: "journal.findFixedLiabilitiesJournalByExpenseIdAndDate",
      config: {
        auth: false,
      },
    },
    {
      // Custom route for finding invoices by client
      method: "GET",
      path: "/journals/equity/:expenseIds",
      handler: "journal.findEquityJournalByExpenseIdAndDate",
      config: {
        auth: false,
      },
    },
  ],
};
