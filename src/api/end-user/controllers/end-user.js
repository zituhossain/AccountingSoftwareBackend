'use strict';

/**
 * end-user controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::end-user.end-user');
