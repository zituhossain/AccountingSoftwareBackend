'use strict';

/**
 * invoice-master controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::invoice-master.invoice-master');
