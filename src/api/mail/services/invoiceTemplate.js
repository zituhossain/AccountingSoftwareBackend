const path = require("path");
function getDocDefinitionInvoice(data) {
  // Extract invoice master and details data from the single argument
  const invoiceMaster = data;
  const invoiceDetailsData = data.details; // Assuming 'details' is the key for invoice details

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
            width: 50, // Adjust the width as necessary
            height: 50, // Adjust the height as necessary
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
            width: 50, // Make this the same as the logo column width to maintain balance
            text: "",
          },
        ],
      },

      // Invoice details and Client details
      {
        columns: [
          {
            // Left column for Invoice details
            width: "auto",
            stack: [
              { text: "Invoice", bold: true, fontSize: 14 },
              {
                text: `Invoice No: #${invoiceMaster.invoice_no}`,
                margin: [0, 5],
              }, // Adjust based on your data structure
              { text: `Date Issued: ${invoiceMaster.date}`, margin: [0, 5] }, // Adjust based on your data structure
            ],
          },
          {
            // Right column for Client details
            width: "*",
            stack: [
              {
                text: "Invoice To:",
                bold: true,
                fontSize: 14,
                alignment: "right",
              },
              { text: `${invoiceMaster.client.name}`, alignment: "right" }, // Adjust based on your data structure
              { text: `${invoiceMaster.client.address}`, alignment: "right" }, // Adjust based on your data structure
              { text: `${invoiceMaster.client.email}`, alignment: "right" }, // Adjust based on your data structure
              {
                text: `${invoiceMaster.client.phone}`,
                alignment: "right",
                margin: [0, 0, 0, 20],
              }, // Adjust based on your data structure
            ],
          },
        ],
      },

      // Divider line
      {
        canvas: [{ type: "line", x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 2 }],
      },
      { text: "", style: "header", margin: [0, 20, 0, 10] },

      // Invoice items table
      {
        style: "itemsTable",
        table: {
          headerRows: 1,
          widths: ["*", "*", "*", "*", "*", "*"],
          body: [
            [
              { text: "Driver Name", style: "tableHeader" },
              { text: "Driver Phone", style: "tableHeader" },
              { text: "Vehicle No", style: "tableHeader" },
              { text: "Container No", style: "tableHeader" },
              { text: "Amount", style: "tableHeader" },
              { text: "Overweight", style: "tableHeader" },
            ],
            ...invoiceDetailsData.map((item) => [
              item.driver_name,
              item.driver_phone,
              item.vehicle_number,
              item.container_number,
              item.rate,
              item.overweight,
            ]),
            [
              {
                text: "Total Amount",
                colSpan: 5,
                alignment: "right",
                style: "tableHeader",
              },
              {},
              {},
              {},
              {}, // Empty cells filling the colSpan
              { text: `${invoiceMaster.total_amount}`, style: "tableHeader" }, // This is where the total amount goes
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

module.exports = getDocDefinitionInvoice;
