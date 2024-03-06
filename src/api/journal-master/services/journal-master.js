'use strict';

/**
 * journal-master service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::journal-master.journal-master');
