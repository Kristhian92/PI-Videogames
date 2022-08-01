const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
        
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },

    description: {
       type: DataTypes.TEXT,
       allowNull: false,
    },
    
    released : {
      type: DataTypes.STRING,
      allowNull: false,

    },

    background_image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      
    },

    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
      
   

  });
};
      
      
   
      
   
    


      





    

