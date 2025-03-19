'use strict';

/**
 * marca controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::marca.marca', ({ strapi }) => ({
  // Sobrescribe el método delete
  async delete(ctx) {
    const { id } = ctx.params;
    
    // Verificar si la marca tiene modelos asociados
    const marca = await strapi.entityService.findOne('api::marca.marca', id, {
      populate: ['modelos']
    });
    
    // Si la marca tiene modelos asociados, mostrar un error
    if (marca.modelos && marca.modelos.length > 0) {
      return ctx.badRequest('No se puede eliminar una marca que tenga modelos asociados. Primero elimine los modelos.');
    }
    
    // Si no tiene modelos, permitir la eliminación
    return await super.delete(ctx);
  }
}));