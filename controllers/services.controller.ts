import { Request, Response } from 'express';
import ServicesModel, { ServicesDocument } from '../models/services';
import { generateToken } from '../middlewares/generatetoken';

export const createService = async (req: Request, res: Response) => {
  const { package_id, service_name } = req.body;

  try {
    const existingService = await ServicesModel.findOne({ package_id });

    if (existingService) {
      return res.status(400).json({ error: 'Package ID already exists' });
    }

    const newService = new ServicesModel({
      package_id,
      service_name,
    });

    const expiresIn = '1m';
    const token = generateToken({ user: 'example' }, expiresIn);

    await newService.save();

    res.status(201).json({ message: 'Service created successfully', service: newService, expiresIn, token });
  } catch (error) {
    console.error('Error creating the service:', error);
    res.status(500).json({ error: 'An error occurred while creating the service' });
  }
};

export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await ServicesModel.find();
    res.json({ message: 'All services retrieved successfully', services });
  } catch (error) {
    console.error('Error retrieving services:', error);
    res.status(500).json({ error: 'An error occurred while retrieving services' });
  }
};

export const getServiceById = async (req: Request, res: Response) => {
  const serviceId = req.params.id;
  try {
    const service = await ServicesModel.findById(serviceId);

    if (service) {
      res.json({ message: 'Service retrieved successfully', service });
    } else {
      res.status(404).json({ error: 'Service not found' });
    }
  } catch (error) {
    console.error('Error retrieving service by ID:', error);
    res.status(500).json({ error: 'An error occurred while retrieving service' });
  }
};

export const updateService = async (req: Request, res: Response) => {
  const serviceId = req.params.id;

  try {
    const service = await ServicesModel.findById(serviceId);

    if (service) {
      service.package_id = req.body.package_id;
      service.service_name = req.body.service_name;

      await service.save();

      const expiresIn = '1m';
      const token = generateToken({ user: 'example' }, expiresIn);

      return res.status(200).json({
        message: 'Service updated successfully',
        service,
        expiresIn,
        token,
      });
    } else {
      return res.status(404).json({ error: 'Service not found' });
    }
  } catch (error) {
    console.error('Error updating service:', error);
    return res.status(500).json({ error: 'An error occurred while updating service' });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  const serviceId = req.params.id;

  try {
    const service = await ServicesModel.findById(serviceId);

    if (service) {
      await service.deleteOne();
      return res.status(204).json({ message: 'Service deleted successfully' });
    } else {
      return res.status(404).json({ error: 'Service not found' });
    }
  } catch (error) {
    console.error('Error deleting service:', error);
    return res.status(500).json({ error: 'An error occurred while deleting service' });
  }
};
