import Services, { ServicesDocument } from '../models/services';

const createService = async (serviceData: any): Promise<ServicesDocument> => {
  try {
    const newService = new Services(serviceData);
    await newService.save();
    return newService;
  } catch (error) {
    throw error;
  }
};

const updateService = async (serviceId: number, serviceData: any): Promise<ServicesDocument> => {
  try {
    const updatedService = await Services.findByIdAndUpdate(serviceId, serviceData, { new: true });

    if (!updatedService) {
      throw new Error('Service not found or no updates were made.');
    }

    return updatedService;
  } catch (error) {
    throw error;
  }
};

const deleteService = async (serviceId: number): Promise<void> => {
  try {
    const deletedService = await Services.findByIdAndRemove(serviceId);

    if (!deletedService) {
      throw new Error('Service not found or no deletions were made.');
    }
  } catch (error) {
    throw error;
  }
};

const getServiceById = async (serviceId: number): Promise<ServicesDocument | null> => {
  try {
    const service = await Services.findById(serviceId);
    return service;
  } catch (error) {
    throw error;
  }
};

const getAllServices = async (): Promise<ServicesDocument[]> => {
  try {
    const services = await Services.find();
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
