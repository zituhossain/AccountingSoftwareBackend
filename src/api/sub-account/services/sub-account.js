'use strict';

/**
 * sub-account service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sub-account.sub-account');
