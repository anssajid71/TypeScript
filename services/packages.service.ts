import { Request, Response } from 'express';
import PackageModel, { PackageDocument } from '../models/packages';

export const createPackage = async (req: Request, res: Response) => {
  const { name, email, price, start_date, end_date, total_days, type, images, available_seats, location } = req.body;

  try {
    const existingPackage = await PackageModel.findOne({ email });

    if (existingPackage) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const newPackage = new PackageModel({
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
    });

    await newPackage.save();

    res.status(201).json({ message: 'Package created successfully', package: newPackage });
  } catch (error) {
    console.error('Error creating the package:', error);
    res.status(500).json({ error: 'An error occurred while creating the package' });
  }
};

export const getAllPackages = async (req: Request, res: Response) => {
  try {
    const packages = await PackageModel.find();
    res.json({ message: 'All packages retrieved successfully', packages });
  } catch (error) {
    console.error('Error retrieving packages:', error);
    res.status(500).json({ error: 'An error occurred while retrieving packages' });
  }
};

export const getPackageById = async (req: Request, res: Response) => {
  const packageId = req.params.id;

  try {
    const Packages = await PackageModel.findById(packageId);

    if (Packages) {
      res.json({ message: 'Package retrieved successfully', Packages });
    } else {
      res.status(404).json({ error: 'Package not found' });
    }
  } catch (error) {
    console.error('Error retrieving package by ID:', error);
    res.status(500).json({ error: 'An error occurred while retrieving package' });
  }
};

export const updatePackage = async (req: Request, res: Response) => {
  const packageId = req.params.id;

  try {
    const Packages = await PackageModel.findById(packageId);

    if (Packages) {
      Packages.set(req.body);
      await Packages.save();

      return res.status(200).json({
        message: 'Package updated successfully',
        Packages,
      });
    } else {
      return res.status(404).json({ error: 'Package not found' });
    }
  } catch (error) {
    console.error('Error updating the package:', error);
    return res.status(500).json({ error: 'An error occurred while updating the package' });
  }
};

export const deletePackage = async (req: Request, res: Response) => {
  const packageId = req.params.id;

  try {
    const Packages = await PackageModel.findById(packageId);

    if (Packages) {
      await Packages.deleteOne();
      return res.status(204).json({ message: 'Package deleted successfully' });
    } else {
      return res.status(404).json({ error: 'Package not found' });
    }
  } catch (error) {
    console.error('Error deleting the package:', error);
    return res.status(500).json({ error: 'An error occurred while deleting the package' });
  }
};
