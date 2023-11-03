import { Request, Response } from 'express';
import Company, { ICompany } from '../models/companies';

export const createCompany = async (req: Request, res: Response) => {
  try {
    const { user_id, name, logo, phone_number, payment_status } = req.body;

    const existingCompany = await Company.findOne({ user_id });

    if (existingCompany) {
      return res.status(400).json({ error: 'User with the same user_id already exists' });
    }

    const newCompany: ICompany = new Company({
      user_id,
      name,
      logo,
      phone_number,
      payment_status,
    });

    await newCompany.save();

    res.status(201).json({ message: 'Company created successfully', company: newCompany });
  } catch (error) {
    console.error('Error creating the company:', error);
    res.status(500).json({ error: 'An error occurred while creating the company' });
  }
};

export const getAllCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await Company.find();
    res.json({ message: 'All companies retrieved successfully', companies });
  } catch (error) {
    console.error('Error retrieving companies:', error);
    res.status(500).json({ error: 'An error occurred while retrieving companies' });
  }
};

export const getCompanyById = async (req: Request, res: Response) => {
  const companyId = req.params.id;
  try {
    const company = await Company.findOne({ _id: companyId });

    if (company) {
      res.json({ message: 'Company retrieved successfully', company });
    } else {
      res.status(404).json({ error: 'Company not found' });
    }
  } catch (error) {
    console.error('Error retrieving company by ID:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the company' });
  }
};

export const updateCompany = async (req: Request, res: Response) => {
  const companyId = req.params.id;
  try {
    const updatedCompany = await Company.findByIdAndUpdate(companyId, req.body, { new: true });

    if (updatedCompany) {
      res.json({ message: 'Company updated successfully', company: updatedCompany });
    } else {
      res.status(404).json({ error: 'Company not found' });
    }
  } catch (error) {
    console.error('Error updating the company:', error);
    res.status(500).json({ error: 'An error occurred while updating the company' });
  }
};

export const deleteCompany = async (req: Request, res: Response) => {
  const companyId = req.params.id;
  try {
    const deletedCompany = await Company.findByIdAndDelete(companyId);

    if (deletedCompany) {
      res.status(204).json({ message: 'Company deleted successfully' });
    } else {
      res.status(404).json({ error: 'Company not found' });
    }
  } catch (error) {
    console.error('Error deleting the company:', error);
    res.status(500).json({ error: 'An error occurred while deleting the company' });
  }
};
