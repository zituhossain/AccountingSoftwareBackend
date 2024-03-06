'use strict';

/**
 * invoice-master service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::invoice-master.invoice-master');
