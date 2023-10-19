import { Request, Response } from 'express';
import Services  from '../models/services';
import { validationResult } from 'express-validator';
import { generateToken } from '../config/generatetoken';

interface ServiceData {
  id: number; 
  package_id: number;
  service_name: string;
}

let services: ServiceData[] = [];
let nextServiceId = 1;

// ...
export const createService = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newService: ServiceData = {
      id: nextServiceId++,
      package_id: req.body.package_id,
      service_name: req.body.service_name,
    };

    services.push(newService);

    const expiresIn = '1m';
    const token = generateToken({ data: { user: 'example' }, expiresIn });

    res.status(201).json({ message: 'Service created successfully', service: newService, token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the service' });
  }
};
// ...


export const getAllServices = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.json({ message: 'All services retrieved successfully', services });
};
