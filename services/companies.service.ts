import Company, { ICompany } from '../models/companies';

const createCompany = async (companyData: ICompany) => {
  try {
    const newCompany: ICompany = new Company(companyData);
    await newCompany.save();
    return newCompany;
  } catch (error) {
    throw error;
  }
};

const updateCompany = async (companyId: string, companyData: ICompany) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(companyId, companyData, { new: true });

    if (!updatedCompany) {
      throw new Error('Company not found or no updates were made.');
    }

    return updatedCompany;
  } catch (error) {
    throw error;
  }
};

const getAllCompanies = async () => {
  try {
    const companies = await Company.find();
    return companies;
  } catch (error) {
    throw error;
  }
};

const getCompanyById = async (companyId: string) => {
  try {
    const company = await Company.findById(companyId);

    if (!company) {
      throw new Error('Company not found.');
    }

    return company;
  } catch (error) {
    throw error;
  }
};

const deleteCompany = async (companyId: string) => {
  try {
    const deletedCompany = await Company.findByIdAndRemove(companyId);

    if (!deletedCompany) {
      throw new Error('Company not found or no deletions were made.');
    }
  } catch (error) {
    throw error;
  }
};

export {
  createCompany,
  updateCompany,
  getAllCompanies,
  getCompanyById,
  deleteCompany,
};
