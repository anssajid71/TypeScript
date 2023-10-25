import { Request, Response } from 'express';
import Services from '../models/services';
import { validationResult } from 'express-validator';
import { generateToken } from '../config/generatetoken';

export const createService = async (req: Request, res: Response) => {
  const { id, package_id, service_name } = req.body;

  try {
    const existingService = await Services.findOne({ where: { package_id } });

    if (existingService) {
      return res.status(400).json({ error: 'Package ID already exists' });
    }

    const newService = await Services.create({
      id,
      package_id,
      service_name,
    });
    const expiresIn = '1m';
    const token = generateToken({ data: { user: 'example' }, expiresIn });


    res.status(201).json({ message: 'Service created successfully', service: newService, expiresIn, token });
  } catch (error) {
    console.error('Error creating the service:', error);
    res.status(500).json({ error: 'An error occurred while creating the service' });
  }
};



export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await Services.findAll();
    res.json({ message: 'All services retrieved successfully', services });
  } catch (error) {
    console.error('Error retrieving services:', error);
    res.status(500).json({ error: 'An error occurred while retrieving services' });
  }
};

export const getServiceById = async (req: Request, res: Response) => {
  const serviceId = parseInt(req.params.id, 10);
  try {
    const service = await Services.findByPk(serviceId);
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
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const serviceId = parseInt(req.params.id, 10);
  try {
    const service = await Services.findByPk(serviceId);

    if (service) {
      service.package_id = req.body.package_id;
      service.service_name = req.body.service_name;
      await service.save();
      res.json({ message: 'Service updated successfully', service });
    } else {
      res.status(404).json({ error: 'Service not found' });
    }
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'An error occurred while updating service' });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  const serviceId = parseInt(req.params.id, 10);
  try {
    const service = await Services.findByPk(serviceId);

    if (service) {
      await service.destroy();
      res.status(204).json({ message: 'Service deleted successfully' });
    } else {
      res.status(404).json({ error: 'Service not found' });
    }
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'An error occurred while deleting service' });
  }
};
