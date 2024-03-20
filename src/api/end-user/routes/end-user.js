'use strict';

/**
 * end-user router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::end-user.end-user');
