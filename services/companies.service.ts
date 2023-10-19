import Companies  from '../models/companies';

const createCompany = async (companyData: any) => {
  try {
    const newCompany = await Companies.create(companyData);
    return newCompany;
  } catch (error) {
    throw error;
  }
};
const updateCompany = async (companyId: number, companyData: any) => {
  try {
    const updatedCompany = await Companies.update(companyData, {
      where: { id: companyId },
    });

    if (updatedCompany[0] === 0) {
      throw new Error('Company not found or no updates were made.');
    }

    const company = await Companies.findByPk(companyId);
    return company;
  } catch (error) {
    throw error;
  }
};

const getAllCompanies = async () => {
  try {
    const companies = await Companies.findAll();
    return companies;
  } catch (error) {
    throw error;
  }
};

const getCompanyById = async (companyId: number) => {
  try {
    const company = await Companies.findByPk(companyId);
    if (!company) {
      throw new Error('Company not found.');
    }
    return company;
  } catch (error) {
    throw error;
  }
};

const deleteCompany = async (companyId: number) => {
  try {
    const rowsDeleted = await Companies.destroy({
      where: { id: companyId },
    });

    if (rowsDeleted === 0) {
      throw Error('Company not found or no deletions were made.');
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
