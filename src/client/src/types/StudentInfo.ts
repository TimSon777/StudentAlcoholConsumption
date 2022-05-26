import { Age } from "./Age";
import { Binary } from "./Binary";
import { Sex } from "./Sex";
import { AddressType } from "./AddressType";
import { CohabitationStatus } from "./CohabitationStatus";

export type StudentInfo = {
  sex: Sex | "";
  age: Age | "";
  address: AddressType | "";
  Pstatus: CohabitationStatus | "";
  traveltime: number | "";
  studytime: number | "";
  failures: number | "";
  famsup: Binary | "";
  activities: Binary | "";
  romantic: Binary | "";
  famrel: number | "";
  freetime: number | "";
  goout: number | "";
  health: number | "";
  absences: number | "";
};

export const DefaultStudentInfo: StudentInfo = {
  sex: "",
  age: "",
  address: "",
  absences: "",
  activities: "",
  failures: "",
  famrel: "",
  famsup: "",
  freetime: "",
  goout: "",
  health: "",
  Pstatus: "",
  romantic: "",
  studytime: "",
  traveltime: "",
};

// sex, age, address, Pstatus, traveltime, studytime, failures, famsup, paid, activities, romantic, famrel, freetime, goout, health, absences
