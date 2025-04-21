import { factories } from '@strapi/strapi'
export default factories.createCoreController('api::modelo.modelo');

'use strict';
const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::modelo.modelo', ({ strapi }) => ({
  // Sobrescribe el método delete
  async delete(ctx) {
    const { id } = ctx.params;
    
    // Verificar si el modelo tiene versiones asociadas
    const modelo = await strapi.entityService.findOne('api::modelo.modelo', id, {
      populate: ['versiones']
    });
    
    // Si el modelo tiene versiones asociadas, mostrar un error
    if (modelo.versiones && modelo.versiones.length > 0) {
      return ctx.badRequest('No se puede eliminar un modelo que tenga versiones asociadas. Primero elimine las versiones.');
    }
    
    // Si no tiene versiones, permitir la eliminación
    return await super.delete(ctx);
  }
}));