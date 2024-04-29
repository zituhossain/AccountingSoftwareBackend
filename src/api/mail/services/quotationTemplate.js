const path = require("path");
const formatDate = require("./utils/dateUtils.js");

function getDocDefinition(quotation) {
  // const quotation = quotation;
  return {
    content: [
      // Header
      {
        columns: [
          {
            // Logo on the left
            image: path.join(
              __dirname,
              "../../../../public/uploads/output.png"
            ), // Provide the correct path to your logo image
            width: 50,
            height: 50,
          },
          {
            // Company Info Centered
            width: "*",
            stack: [
              {
                text: "Top-4 Logistics",
                fontSize: 16,
                bold: true,
                alignment: "center",
                color: "green",
              },
              {
                text: "9/31, F, Eastern Plaza, Hatirpul, Dhaka - 1205, Bangladesh",
                alignment: "center",
              },
              {
                text: "+8801852244141",
                alignment: "center",
              },
              {
                text: "top4we@gmail.com",
                alignment: "center",
                margin: [0, 0, 0, 20], // Add space after the header
              },
            ],
          },
          {
            // This empty column helps to center the middle column
            width: 50,
            text: "",
          },
        ],
      },

      // Quotation details
      {
        columns: [
          {
            // Left column for Quotation details
            width: "auto",
            stack: [
              { text: "Quotation", bold: true, fontSize: 14 },
              {
                text: `Quotation No: #${quotation.quotation_no}`,
                margin: [0, 5],
              },
              {
                text: `Date Issued: ${formatDate(
                  quotation.date,
                  "DD-MM-YYYY"
                )}`,
                margin: [0, 5],
              },
            ],
          },
          {
            // Right column for Client details
            width: "*",
            stack: [
              {
                text: "Quotation To:",
                bold: true,
                fontSize: 14,
                alignment: "right",
              },
              { text: `${quotation.client.name}`, alignment: "right" },
              { text: `${quotation.client.address}`, alignment: "right" },
              { text: `${quotation.client.email}`, alignment: "right" },
              {
                text: `${quotation.client.phone}`,
                alignment: "right",
                margin: [0, 0, 0, 20],
              },
            ],
          },
        ],
      },

      // Divider line
      {
        canvas: [{ type: "line", x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 2 }],
      },
      { text: "", style: "header", margin: [0, 20, 0, 10] },

      // Quotation items table
      {
        style: "itemsTable",
        table: {
          headerRows: 1,
          widths: ["*", "*", "*", "*", "*"],
          body: [
            [
              { text: "Item", style: "tableHeader" },
              { text: "Client Rate", style: "tableHeader" },
              { text: "Our Rate", style: "tableHeader" },
              { text: "No. of Items", style: "tableHeader" },
              { text: "Overweight", style: "tableHeader" },
            ],
            [
              "1",
              quotation.client_rate,
              quotation.our_rate,
              quotation.no_of_items,
              quotation.overweight,
            ],
          ],
        },
      },

      // Footer
      {
        stack: [
          "Thanking You",
          "Joyes Eleyas",
          "For: Top-4 Logistics",
          "Cell: +8801852244141",
        ],
        style: "footer",
      },
    ],
    styles: {
      header: {
        fontSize: 14,
        bold: true,
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "black",
      },
      itemsTable: {
        margin: [0, 5, 0, 15],
      },
      footer: {
        alignment: "center",
        margin: [0, 20, 0, 0],
      },
    },
  };
}

module.exports = getDocDefinition;
