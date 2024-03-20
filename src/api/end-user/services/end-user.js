'use strict';

/**
 * end-user service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::end-user.end-user');
