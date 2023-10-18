import Services from '../models/services';

const createService = async (serviceData: any) => {
  try {
    const newService = await Services.create(serviceData);
    return newService;
  } catch (error) {
    throw error;
  }
};

const updateService = async (serviceId: number, serviceData: any) => {
  try {
    const [rowsUpdated] = await Services.update(serviceData, {
      where: { id: serviceId },
    });

    if (rowsUpdated === 0) {
      throw new Error('Service not found or no updates were made.');
    }

    const updatedService = await Services.findByPk(serviceId);
    return updatedService;
  } catch (error) {
    throw error;
  }
};

const deleteService = async (serviceId: number) => {
  try {
    const rowsDeleted = await Services.destroy({
      where: { id: serviceId },
    });

    if (rowsDeleted === 0) {
      throw new Error('Service not found or no deletions were made.');
    }
  } catch (error) {
    throw error;
  }
};

const getServiceById = async (serviceId: number) => {
  try {
    const service = await Services.findByPk(serviceId);
    return service;
  } catch (error) {
    throw error;
  }
};

const getAllServices = async () => {
  try {
    const services = await Services.findAll();
    return services;
  } catch (error) {
    throw error;
  }
};

export {
  createService,
  updateService,
  deleteService,
  getServiceById,
  getAllServices,
};
