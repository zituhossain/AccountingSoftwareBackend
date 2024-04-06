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
  ],
};
