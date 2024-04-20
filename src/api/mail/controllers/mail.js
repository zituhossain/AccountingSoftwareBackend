"use strict";

const nodemailer = require("nodemailer");
const PdfPrinter = require("pdfmake");
const fs = require("fs");
const path = require("path");
const https = require("https");
const getDocDefinitionQuotation = require("../services/quotationTemplate.js");
const getDocDefinitionInvoice = require("../services/invoiceTemplate.js");

const fonts = {
  Roboto: {
    normal: path.join(__dirname, "../../../../fonts/Roboto/Roboto-Regular.ttf"),
    bold: path.join(__dirname, "../../../../fonts/Roboto/Roboto-Medium.ttf"),
    italics: path.join(__dirname, "../../../../fonts/Roboto/Roboto-Italic.ttf"),
    bolditalics: path.join(
      __dirname,
      "../../../../fonts/Roboto/Roboto-MediumItalic.ttf"
    ),
  },
};

const printer = new PdfPrinter(fonts);

// SMTP transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_APP_PASSWORD,
  },
});

async function sendWhatsAppMessage(phoneNumber, documentUrl, filename) {
  const postData = JSON.stringify({
    messaging_product: "whatsapp",
    to: phoneNumber,
    type: "document",
    document: {
      link: documentUrl,
      filename: filename,
    },
  });

  const options = {
    hostname: "graph.facebook.com",
    port: 443,
    path: `/${process.env.WHATSAPP_API_VERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      "Content-Length": Buffer.byteLength(postData),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve(JSON.parse(data));
      });
    });

    req.on("error", (e) => {
      reject(e);
    });

    req.write(postData);
    req.end();
  });
}

module.exports = {
  // async sendQuotation(ctx) {
  //   try {
  //     const { id } = ctx.request.body;

  //     const quotation = await strapi.entityService.findOne(
  //       "api::quotation.quotation",
  //       id,
  //       {
  //         populate: { client: true },
  //       }
  //     );

  //     if (!quotation.client.email) {
  //       return ctx.throw(400, "Client email address is missing.");
  //     }

  //     const docDefinition = getDocDefinitionQuotation(quotation); // Use the separate module to get docDefinition
  //     const pdfDoc = printer.createPdfKitDocument(docDefinition);
  //     const pdfFilename = `quotation-${id}.pdf`;
  //     const pdfPath = path.resolve(
  //       __dirname,
  //       "../../../../public/pdf/quotation.pdf"
  //     );
  //     const stream = fs.createWriteStream(pdfPath);

  //     pdfDoc.pipe(stream);
  //     pdfDoc.end();

  //     await new Promise((resolve, reject) => {
  //       stream.on("finish", () => resolve());
  //       stream.on("error", reject);
  //     });

  //     const mailOptions = {
  //       from: `"Top4 Logistics Ltd" <${process.env.MAIL_USERNAME}>`,
  //       to: quotation.client.email,
  //       subject: "Quotation",
  //       text: "Here is your quotation.",
  //       attachments: [{ filename: pdfFilename, path: pdfPath }],
  //     };

  //     await transporter.sendMail(mailOptions);

  //     ctx.body = { message: "Quotation sent successfully!" };
  //   } catch (err) {
  //     console.error("Error in sendQuotation controller:", err);
  //     ctx.throw(500, "Error sending quotation");
  //   }
  // },

  async sendQuotation(ctx) {
    const { id } = ctx.request.body;
    const quotation = await strapi.entityService.findOne(
      "api::quotation.quotation",
      id,
      {
        populate: { client: true },
      }
    );

    if (!quotation.client.email) {
      return ctx.throw(400, "Client email address is missing.");
    }

    const docDefinition = getDocDefinitionQuotation(quotation);
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const pdfFilename = `quotation-${id}.pdf`;
    const pdfPath = path.resolve(
      __dirname,
      "../../../../public/pdf/quotation.pdf"
    );
    const stream = fs.createWriteStream(pdfPath);

    pdfDoc.pipe(stream);
    pdfDoc.end();

    await new Promise((resolve, reject) => {
      stream.on("finish", async () => {
        // Email sending logic
        const mailOptions = {
          from: `"Top4 Logistics Ltd" <${process.env.MAIL_USERNAME}>`,
          to: quotation.client.email,
          subject: "Quotation",
          text: "Here is your quotation.",
          attachments: [{ filename: pdfFilename, path: pdfPath }],
        };
        await transporter.sendMail(mailOptions);

        // WhatsApp sending logic
        const publicPdfUrl = `http://localhost:1337/pdf/${pdfFilename}`; // Make sure to replace this with your actual domain
        try {
          await sendWhatsAppMessage(
            quotation.client.phoneNumber,
            publicPdfUrl,
            pdfFilename
          );
          ctx.body = {
            message: "Quotation sent successfully via Email and WhatsApp!",
          };
        } catch (whatsappError) {
          console.error("Error sending quotation via WhatsApp:", whatsappError);
          ctx.throw(500, "Error sending quotation via WhatsApp");
        }
        resolve();
      });
      stream.on("error", (error) => {
        reject(error);
      });
    });
  },
  async sendInvoice(ctx) {
    try {
      // Assuming you have the invoice ID in the request body similar to the quotation ID
      const { id } = ctx.request.body;

      // Fetch the invoice master data including the client's information
      const invoiceMaster = await strapi.entityService.findOne(
        "api::invoice-master.invoice-master",
        id,
        {
          populate: { client: true },
        }
      );

      // Check if client email exists as done for quotation
      if (!invoiceMaster.client.email) {
        return ctx.throw(400, "Client email address is missing.");
      }

      // Fetch the invoice details related to the invoice master
      // Assuming there's a relation defined that can be populated
      const invoiceDetails = await strapi.entityService.findMany(
        "api::invoice-detail.invoice-detail",
        {
          filters: { invoice_master: id },
          populate: {
            /* fields you want to populate in invoice-detail */
          },
        }
      );

      // Combine the master and detail data as needed for your invoice PDF generation
      const invoiceData = {
        ...invoiceMaster,
        details: invoiceDetails,
      };

      console.log("invoiceData", invoiceData);

      // Use the combined invoice data for PDF generation
      const docDefinition = getDocDefinitionInvoice(invoiceData); // Adapt the getDocDefinition to handle invoice data
      const pdfDoc = printer.createPdfKitDocument(docDefinition);
      const pdfPath = path.resolve(__dirname, "../../public/pdf/invoice.pdf");
      const stream = fs.createWriteStream(pdfPath);

      pdfDoc.pipe(stream);
      pdfDoc.end();

      await new Promise((resolve, reject) => {
        stream.on("finish", () => resolve());
        stream.on("error", reject);
      });

      // The rest of your mail sending logic remains the same, adjusting the mail subject and attachment filename as needed
      const mailOptions = {
        from: `"Top4 Logistics Ltd" <${process.env.MAIL_USERNAME}>`,
        to: invoiceMaster.client.email,
        subject: "Invoice",
        text: "Here is your invoice.",
        attachments: [{ filename: "invoice.pdf", path: pdfPath }],
      };

      await transporter.sendMail(mailOptions);

      ctx.body = { message: "Invoice sent successfully!" };
    } catch (err) {
      console.error("Error in sendInvoice controller:", err);
      ctx.throw(500, "Error sending Invoice");
    }
  },
};
