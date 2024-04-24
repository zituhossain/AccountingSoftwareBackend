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
      // Custom route for finding invoices by client
      method: "GET",
      path: "/transactions/quotationsByClient/:clientId",
      handler: "transaction.findQuotationsByClient",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/transactions/sum-paid-amounts-invoice/:invoiceId",
      handler: "transaction.sumPaidAmountsInvoice",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/transactions/sum-paid-amounts-quotation/:quotationId",
      handler: "transaction.sumPaidAmountsQuotation",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
