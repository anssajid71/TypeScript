import { Request, Response } from 'express';
import { Company } from '../models/companies';
import { validationResult } from 'express-validator';

let companies: Company[] = [];

export const createCompany = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newCompany: Company = {
    id: companies.length + 1,
    user_id: req.body.user_id,
    name: req.body.name,
    logo: req.body.logo,
    phone_number: req.body.phone_number,
    payment_status: req.body.payment_status,
  };

  newCompany.id = companies.length + 1;
  companies.push(newCompany);
  res.status(201).json({ message: 'Company created successfully', company: newCompany });
};

export const getAllCompanies = (req: Request, res: Response) => {
  res.json({ message: 'All companies retrieved successfully', companies });
};

export const getCompanyById = (req: Request, res: Response) => {
  const companyId = parseInt(req.params.id);
  const company = companies.find((c) => c.id === companyId);

  if (company) {
    res.json({ message: 'Company retrieved successfully', company });
  } else {
    res.status(404).json({ error: 'Company not found' });
  }
};

export const updateCompany = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const companyId = parseInt(req.params.id);
  const company = companies.find((c) => c.id === companyId);

  if (company) {
    company.name = req.body.name;
    company.logo = req.body.logo;
    company.phone_number = req.body.phone_number;
    company.payment_status = req.body.payment_status;

    res.json({ message: 'Company updated successfully', company });
  } else {
    res.status(404).json({ error: 'Company not found' });
  }
};

export const deleteCompany = (req: Request, res: Response) => {
  const companyId = parseInt(req.params.id);
  const index = companies.findIndex((c) => c.id === companyId);

  if (index !== -1) {
    companies.splice(index, 1);
    return res.status(204).json({ message: 'Company deleted successfully' });
  } else {
    return res.status(404).json({ error: 'Company not found' });
  };
};
