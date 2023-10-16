import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Package } from '../models/packages';

const packages: Package[] = [];

export const createPackage = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const newPackage: Package = {
    id: packages.length + 1,
    price: req.body.price,
    start_date: new Date(req.body.start_date),
    end_date: new Date(req.body.end_date),
    total_days: req.body.total_days,
    type: req.body.type,
    images: req.body.images,
    available_seats: req.body.available_seats,
    location: req.body.location,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
  };

  packages.push(newPackage);
  res.status(201).json({ message: 'Package created successfully', package: newPackage });
};

export const getAllPackages = (req: Request, res: Response) => {
  res.json({ message: 'All packages retrieved successfully', packages });
};

export const getPackageById = (req: Request, res: Response) => {
  const packageId = parseInt(req.params.id);
  const pkg = packages.find((p) => p.id === packageId);

  if (pkg) {
    res.json({ message: 'Package retrieved successfully', package: pkg });
  } else {
    res.status(404).json({ error: 'Package not found' });
  }
};

export const updatePackage = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const packageId = parseInt(req.params.id);
  const pkg = packages.find((p) => p.id === packageId);

  if (pkg) {
    pkg.price = req.body.price;
    pkg.start_date = new Date(req.body.start_date);
    pkg.end_date = new Date(req.body.end_date);
    pkg.total_days = req.body.total_days;
    pkg.type = req.body.type;
    pkg.images = req.body.images;
    pkg.available_seats = req.body.available_seats;
    pkg.location = req.body.location;
    pkg.updated_at = req.body.updated_at;

    res.json({ message: 'Package updated successfully', package: pkg });
  } else {
    res.status(404).json({ error: 'Package not found' });
  }
};

export const deletePackage = (req: Request, res: Response) => {
  const packageId = parseInt(req.params.id);
  const index = packages.findIndex((p) => p.id === packageId);

  if (index !== -1) {
    packages.splice(index, 1);
    res.status(204).json({ message: 'Package deleted successfully' });
  } else {
    res.status(404).json({ error: 'Package not found' });
  }
};
