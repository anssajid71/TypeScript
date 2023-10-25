import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { generateToken } from '../config/generatetoken';
import Packages from '../models/packages';

export const createPackage = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      name,
      email,
      price,
      start_date,
      end_date,
      total_days,
      type,
      images,
      available_seats,
      location,
    } = req.body;

    const existingPackage = await Packages.findOne({ where: { email } });

    if (existingPackage) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const newPackage = await Packages.create({
      name,
      email,
      price,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      total_days,
      type,
      images,
      available_seats,
      location,
    });

    const expiresIn = '1m';
    const token = generateToken({ data: { user: 'example' }, expiresIn });

    res.status(200).json({ message: 'Package created successfully', package: newPackage,expiresIn, token  });
  } catch (error) {
    console.error('Error creating the package:', error);
    res.status(500).json({ error: 'An error occurred while creating the package' });
  }
};

export const getAllPackages = async (req: Request, res: Response) => {
  try {
    const packages = await Packages.findAll();
    res.json({ message: 'All packages retrieved successfully', packages });
  } catch (error) {
    console.error('Error retrieving packages:', error);
    res.status(500).json({ error: 'An error occurred while retrieving packages' });
  }
};

export const getPackageById = async (req: Request, res: Response) => {
  const packageId = parseInt(req.params.id, 10);
  try {
    const pkg = await Packages.findByPk(packageId);
    if (pkg) {
      res.json({ message: 'Package retrieved successfully', package: pkg });
    } else {
      res.status(404).json({ error: 'Package not found' });
    }
  } catch (error) {
    console.error('Error retrieving package by ID:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the package' });
  }
};

export const updatePackage = async (req: Request, res: Response) => {
  const packageId = parseInt(req.params.id, 10);
  const pkg = await Packages.findByPk(packageId);

  if (pkg) {
    try {
      pkg.name = req.body.name;
      pkg.email = req.body.email;
      pkg.price = req.body.price;
      pkg.start_date = new Date(req.body.start_date);
      pkg.end_date = new Date(req.body.end_date);
      pkg.total_days = req.body.total_days;
      pkg.type = req.body.type;
      pkg.images = req.body.images;
      pkg.available_seats = req.body.available_seats;
      pkg.location = req.body.location;

      await pkg.save();

      const expiresIn = '1m';
      const token = generateToken({ data: { user: 'example' }, expiresIn });

      return res.status(200).json({
        message: 'Package updated successfully',
        package: pkg,
        token,
        expiresIn,
      });
    } catch (error) {
      console.error('Error updating the package:', error);
      return res.status(500).json({ error: 'An error occurred while updating the package' });
    }
  } else {
    return res.status(404).json({ error: 'Package not found' });
  }
};


export const deletePackage = async (req: Request, res: Response) => {
  const packageId = parseInt(req.params.id, 10);
  try {
    const pkg = await Packages.findByPk(packageId);

    if (pkg) {
      await pkg.destroy();
      res.status(204).json({ message: 'Package deleted successfully' });
    } else {
      res.status(404).json({ error: 'Package not found' });
    }
  } catch (error) {
    console.error('Error deleting the package:', error);
    res.status(500).json({ error: 'An error occurred while deleting the package' });
  }
};
