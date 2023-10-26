import { Request, Response } from 'express';
import Companies from '../models/companies';
import { validationResult } from 'express-validator';
import { generateToken } from '../config/generatetoken';

interface CompanyData {
  id: number;
  user_id: number;
  name: string;
  logo: string | null;
  phone_number: string | null;
  payment_status: string | null;
}

export const createCompany = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { user_id, name, logo, phone_number, payment_status } = req.body;
    const existingCompany = await Companies.findOne({ where: { user_id } });

    if (existingCompany) {
      return res.status(400).json({ error: 'User with the same user_id already exists' });
    }

    const newCompany = await Companies.create({
      id: req.body.id,
      user_id: req.body.user_id,
      name: req.body.name,
      logo: req.body.logo || null,
      phone_number: req.body.phone_number || null,
      payment_status: req.body.payment_status || null,
    });
    const expiresIn = '1m';
    const token = generateToken({ data: { user: 'example' }, expiresIn });

    res.status(201).json({ message: 'Company created successfully', company: newCompany, expiresIn, token });
  } catch (error) {
    console.error('Error creating the company:', error);
    res.status(500).json({ error: 'An error occurred while creating the company' });
  }
};

export const getAllCompanies = (req: Request, res: Response) => {
  Companies.findAll().then((companies) => {
    res.json({ message: 'All companies retrieved successfully', companies });
  });
};

export const getCompanyById = (req: Request, res: Response) => {
  const companyId = parseInt(req.params.id);
  Companies.findByPk(companyId).then((company) => {
    if (company) {
      res.json({ message: 'Company retrieved successfully', company });
    } else {
      res.status(404).json({ error: 'Company not found' });
    }
  });
};

export const updateCompany = (req: Request, res: Response) => {
  const companyId = parseInt(req.params.id);
  Companies.findByPk(companyId).then((company) => {
    if (company) {
      company.name = req.body.name;
      company.logo = req.body.logo || null;
      company.phone_number = req.body.phone_number || null;
      company.payment_status = req.body.payment_status || null;

      company.save().then(() => {
        res.json({ message: 'Company updated successfully', company });
      });
    } else {
      res.status(404).json({ error: 'Company not found' });
    }
  });
};

export const deleteCompany = (req: Request, res: Response) => {
  const companyId = parseInt(req.params.id);
  Companies.findByPk(companyId).then((company) => {
    if (company) {
      company.destroy().then(() => {
        res.status(204).json({ message: 'Company deleted successfully' });
      });
    } else {
      res.status(404).json({ error: 'Company not found' });
    }
  });
};
