const BlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    'BlogPost',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, foreignKey: true },
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    {
      timestamps: true,
      tableName: 'BlogPosts',
      createdAt: 'published',
      updatedAt: 'updated',
    }
  );

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'userId', // que não precisa usar aqui em cima
      as: 'user', //  nome dado a essa relação
    });
  };

  return BlogPost;
};

module.exports = BlogPost;