'use strict';

/**
 * individual-account service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::individual-account.individual-account');
