"use strict";

const nodemailer = require("nodemailer");
const PdfPrinter = require("pdfmake");
const fs = require("fs");
const path = require("path");
const getDocDefinition = require("../services/quotationTemplate.js");

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

module.exports = {
  async sendQuotation(ctx) {
    try {
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

      const docDefinition = getDocDefinition(quotation); // Use the separate module to get docDefinition
      const pdfDoc = printer.createPdfKitDocument(docDefinition);
      const pdfPath = path.resolve(__dirname, "../../public/pdf/quotation.pdf");
      const stream = fs.createWriteStream(pdfPath);

      pdfDoc.pipe(stream);
      pdfDoc.end();

      await new Promise((resolve, reject) => {
        stream.on("finish", () => resolve());
        stream.on("error", reject);
      });

      const mailOptions = {
        from: `"Top4 Logistics Ltd" <${process.env.MAIL_USERNAME}>`,
        to: quotation.client.email,
        subject: "Quotation",
        text: "Here is your quotation.",
        attachments: [{ filename: "quotation.pdf", path: pdfPath }],
      };

      await transporter.sendMail(mailOptions);

      ctx.body = { message: "Quotation sent successfully!" };
    } catch (err) {
      console.error("Error in sendQuotation controller:", err);
      ctx.throw(500, "Error sending quotation");
    }
  },
};
