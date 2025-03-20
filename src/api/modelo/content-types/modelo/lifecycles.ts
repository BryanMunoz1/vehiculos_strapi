module.exports = {
    beforeCreate: async (event) => {
      const { data } = event.params;
      
      // Verificar que el modelo tenga una marca asignada
      if (!data.marca) {
        throw new Error('Un modelo debe estar asociado a una marca.');
      }
      
      // Verificar que la marca exista
      const marcaExists = await strapi.entityService.findOne('api::marca.marca', data.marca);
      if (!marcaExists) {
        throw new Error('La marca asignada no existe.');
      }
    },
    
    beforeUpdate: async (event) => {
      const { data } = event.params;
      
      // Si se está actualizando la marca
      if (data.marca !== undefined) {
        // Verificar que no se elimine la marca
        if (!data.marca) {
          throw new Error('Un modelo debe estar asociado a una marca.');
        }
        
        // Verificar que la nueva marca exista
        const marcaExists = await strapi.entityService.findOne('api::marca.marca', data.marca);
        if (!marcaExists) {
          throw new Error('La marca asignada no existe.');
        }
      }
    }
  };