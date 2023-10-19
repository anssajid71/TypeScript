import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Packages  from '../models/packages'; // Import your Sequelize model
import { generateToken } from '../config/generatetoken';

interface PackageData {
  id: number;
  name: string;
  email: string;
  price: number;
  start_date: Date;
  end_date: Date;
  total_days: number;
  type: string;
  images: string[];
  available_seats: number;
  location: string;
}

let packages: PackageData[] = [];
let nextPackageId = 1; // Initialize a variable to assign unique IDs

export const createPackage = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newPackage: PackageData = {
      id: nextPackageId++, // Assign a unique ID
      name: req.body.name,
      email: req.body.email,
      price: req.body.price,
      start_date: new Date(req.body.start_date),
      end_date: new Date(req.body.end_date),
      total_days: req.body.total_days,
      type: req.body.type,
      images: req.body.images,
      available_seats: req.body.available_seats,
      location: req.body.location,
    };

    packages.push(newPackage);
    const expiresIn = '1m';
const token = generateToken({ data: { user: 'example' }, expiresIn });

    res.status(201).json({ message: 'Package created successfully', package: newPackage, token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the package' });
  }
};

export const getAllPackages = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.json({ message: 'All packages retrieved successfully', packages });
};

export const getPackageById = (req: Request, res: Response) => {
  const packageId = parseInt(req.params.id, 10);
  const pkg = packages.find((p) => p.id === packageId);

  if (pkg) {
    res.json({ message: 'Package retrieved successfully', package: pkg });
  } else {
    res.status(404).json({ error: 'Package not found' });
  }
};

export const updatePackage = (req: Request, res: Response) => {
  const packageId = parseInt(req.params.id, 10);
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

    res.json({ message: 'Package updated successfully', package: pkg });
  } else {
    res.status(404).json({ error: 'Package not found' });
  }
};

export const deletePackage = (req: Request, res: Response) => {
  const packageId = parseInt(req.params.id, 10);
  const index = packages.findIndex((p) => p.id === packageId);

  if (index !== -1) {
    packages.splice(index, 1);
    return res.status(204).json({ message: 'Package deleted successfully' });
  } else {
    return res.status(404).json({ error: 'Package not found' });
  }
};
