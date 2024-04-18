module.exports = {
  routes: [
    {
      // Custom route for finding invoices by client
      method: "GET",
      path: "/transactions/invoicesByClient/:clientId",
      handler: "transaction.findInvoicesByClient",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/transactions/sum-paid-amounts/:invoiceId",
      handler: "transaction.sumPaidAmounts",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};