export * from './modelController.service';
import { ModelControllerService } from './modelController.service';
export * from './restApiController.service';
import { RestApiControllerService } from './restApiController.service';
export const APIS = [ModelControllerService, RestApiControllerService];
