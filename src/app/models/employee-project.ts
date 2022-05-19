import { Employee } from "./employee";
import { Project } from "./project";

export interface EmployeeProject {
    did_complete : boolean,
    project_role : number,
    id_employee : number,
    id_project : number,
    id_employee_project : number,
    employee? : Employee,
    project?  : Project[],
    billableHours : number,
    nonBillableHours : number
}
