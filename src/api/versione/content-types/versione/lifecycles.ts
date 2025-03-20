module.exports = {
    beforeCreate: async (event) => {
      const { data } = event.params;
      
      // Verificar que la versión tenga un modelo asignado
      if (!data.modelo) {
        throw new Error('Una versión debe estar asociada a un modelo.');
      }
      
      // Verificar que el modelo exista
      const modeloExists = await strapi.entityService.findOne('api::modelo.modelo', data.modelo);
      if (!modeloExists) {
        throw new Error('El modelo asignado no existe.');
      }
    },
    
    beforeUpdate: async (event) => {
      const { data } = event.params;
      
      // Si se está actualizando el modelo
      if (data.modelo !== undefined) {
        // Verificar que no se elimine el modelo
        if (!data.modelo) {
          throw new Error('Una versión debe estar asociada a un modelo.');
        }
        
        // Verificar que el nuevo modelo exista
        const modeloExists = await strapi.entityService.findOne('api::modelo.modelo', data.modelo);
        if (!modeloExists) {
          throw new Error('El modelo asignado no existe.');
        }
      }
    }
  };