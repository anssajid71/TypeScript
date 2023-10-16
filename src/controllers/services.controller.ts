import { Request, Response } from 'express';
import { Service } from '../models/services';
import { validationResult } from 'express-validator';

let services: Service[] = [];

export const createService = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newService: Service = {
    id: services.length + 1,
    package_id: req.body.package_id,
    service_name: req.body.service_name,
  };

  services.push(newService);
  res.status(201).json({ message: 'Service created successfully', service: newService });
};

export const getAllServices = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.json({ message: 'All services retrieved successfully', services });
};
