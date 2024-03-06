'use strict';

/**
 * journal-master controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::journal-master.journal-master');
