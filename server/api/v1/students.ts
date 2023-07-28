import { faker } from '@faker-js/faker';
import { gender } from '../../../models/student.model';

export default defineEventHandler((event) => {
  
  return new Array(10).fill(null).map(() => {

    const gender: gender = faker.helpers.arrayElement(["male", "female"]);

    return {
      profile_image: "https://dummyimage.com/640x360/f00/fff",
      full_name_english: faker.person.firstName(gender),
      college_name: faker.company.buzzNoun(),
      department_name: faker.company.buzzNoun(),
      college_level: faker.helpers.arrayElement(["undergraduate", "graduate"]),
      current_level: faker.helpers.arrayElement(["freshman", "sophomore", "junior", "senior"]),
      current_status: faker.helpers.arrayElement(["active", "not-attending", "on-leave", 'alumni', "dead"]),
    }

  });
  
});
