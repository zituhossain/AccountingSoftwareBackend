const path = require("path");

// You can pass more parameters to this function if needed, to customize the PDF content
function getDocDefinition(quotation) {
  return {
    content: [
      // Header
      {
        text: "Top-4 Logistics",
        fontSize: 16,
        bold: true,
        margin: [0, 0, 0, 20],
      },
      {
        stack: [
          "9/31, F, Eastern Plaza, Hatirpul, Dhaka - 1205, Bangladesh",
          "+8801852244141",
          "top4we@gmail.com",
        ],
        // Apply margin here for the whole stack
        margin: [0, 0, 0, 20],
      },

      // Quotation details
      {
        text: `Quotation No: #${quotation.quotation_no}`,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      {
        text: `Date Issued: ${quotation.date}`,
        margin: [0, 0, 0, 40],
      },

      // Client details
      {
        text: "Quotation To:",
        fontSize: 14,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      {
        stack: [
          `${quotation.client.name}`,
          `${quotation.client.address}`,
          `${quotation.client.email}`,
          `${quotation.client.phone}`,
        ],
        // Apply margin here for the whole stack
        margin: [0, 0, 0, 40],
      },

      // Quotation table
      {
        style: "tableExample",
        table: {
          widths: [100, "*", "*", "*", "*"],
          body: [
            ["Item", "Client Rate", "Our Rate", "No. of Items", "Overweight"],
            [
              "1",
              quotation.client_rate,
              quotation.our_rate,
              quotation.no_of_items,
              quotation.overweight,
            ],
          ],
        },
        layout: "lightHorizontalLines",
      },

      // Footer
      {
        text: "Thanking You",
        fontSize: 16,
        bold: true,
        margin: [0, 40, 0, 20],
      },
      {
        stack: ["Joyes Elyas", "For: Top-4 Logistics", "Cell: +8801852244141"],
        // Apply margin here for the whole stack
        margin: [0, 0, 0, 10],
      },
    ],
    styles: {
      tableExample: {
        margin: [0, 5, 0, 35],
      },
    },
  };
}

module.exports = getDocDefinition;
