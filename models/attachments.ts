'use strict';

import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

interface AttachmentsModelAttributes {
  id: number;
  attachment_id: number;
  attachment_type: string;
  attachment_url: string;
  created_at: string;
  updated_at: string;
}

interface AttachmentsModelCreationAttributes extends AttachmentsModelAttributes {
}

class Attachments extends Model<AttachmentsModelAttributes, AttachmentsModelCreationAttributes> {
  public id!: number; 
  public attachment_id!: number;
  public attachment_type!: string;
  public attachment_url!: string;
  public created_at!: string;
  public updated_at!: string;

  public static associate(models: any): void {
    Attachments.hasMany(models.Hotels, {
      foreignKey: 'attachment_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as: 'hotels',
    });
  }
}
  Attachments.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      attachment_id: DataTypes.INTEGER,
      attachment_type: DataTypes.STRING,
      attachment_url: DataTypes.STRING,
      created_at: DataTypes.STRING,
      updated_at: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Attachments',
    }
  );

export default Attachments;
