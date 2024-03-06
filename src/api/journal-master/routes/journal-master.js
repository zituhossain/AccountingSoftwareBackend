'use strict';

/**
 * journal-master router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::journal-master.journal-master');
