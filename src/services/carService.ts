import notFoundError from "../errors/notFoundError.js";
import conflictError from "../errors/conflictError.js";
import carRepository from "../repository/carRepository.js";

async function getCars() {
  const cars = await carRepository.getCars();
  return cars;
}

async function getCar(id: number) {
  const car = await carRepository.getCar(id);
  if (!car) {
    throw notFoundError();
  }

  return car;
}

async function createCar(model: string, licensePlate: string, year: number, color: string) {
  const car = await carRepository.getCarWithLicensePlate(licensePlate);
  if (car) {
    throw conflictError(`Car with license plate ${licensePlate} already registered.`)
  }

  await carRepository.createCar(model, licensePlate, year, color);
}

async function deleteCar(id: number) {
  await getCar(id);
  await carRepository.deleteCar(id);
}

async function updateLicensePlate(licensePlate:string,id:number){
  const result = await carRepository.updateLicensePlate(licensePlate,id);
  return result;
}

const carService = {
  getCars,
  getCar,
  createCar,
  deleteCar,
  updateLicensePlate
}

export default carService;