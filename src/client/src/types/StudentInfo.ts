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
  paid: Binary | "";
  activities: Binary | "";
  romantic: Binary | "";
  famrel: number | "";
  freetime: number | "";
  goout: number | "";
  health: number | "";
  absences: number | "";
};

// sex, age, address, Pstatus, traveltime, studytime, failures, famsup, paid, activities, romantic, famrel, freetime, goout, health, absences