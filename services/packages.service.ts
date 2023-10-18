import Packages from '../models/packages';

const createPackage = async (packageData: any) => {
  try {
    const newPackage = await Packages.create(packageData);
    return newPackage;
  } catch (error) {
    throw error;
  }
};

const updatePackage = async (packageId: number, packageData: any) => {
  try {
    const [rowsUpdated] = await Packages.update(packageData, {
      where: { id: packageId },
    });

    if (rowsUpdated === 0) {
      throw new Error('Package not found or no updates were made.');
    }

    const updatedPackage = await Packages.findByPk(packageId);
    return updatedPackage;
  } catch (error) {
    throw error;
  }
};

const deletePackage = async (packageId: number) => {
  try {
    const rowsDeleted = await Packages.destroy({
      where: { id: packageId },
    });

    if (rowsDeleted === 0) {
      throw new Error('Package not found or no deletions were made.');
    }
  } catch (error) {
    throw error;
  }
};

const getPackageById = async (packageId: number) => {
    try {
      console.log('packageId', packageId);
      const packageItem = await Packages.findByPk(packageId);
      return packageItem;
    } catch (error) {
      throw error;
    }
  };
  

const getAllPackages = async () => {
  try {
    const packages = await Packages.findAll();
    return packages;
  } catch (error) {
    throw error;
  }
};

export {
  createPackage,
  updatePackage,
  deletePackage,
  getPackageById,
  getAllPackages,
};
