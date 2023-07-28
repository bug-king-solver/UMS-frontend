import { faker } from '@faker-js/faker';
import { gender } from '../../../models/student.model';

export default defineEventHandler((event) => {
  
  return new Array(10).fill(null).map(() => {

    const gender: gender = faker.helpers.arrayElement(["male", "female"]);

    return {

        profile_image: "https://dummyimage.com/640x360/f00/fff",
        
        full_name: faker.person.fullName({ sex: gender }),
        
        staff_off: faker.helpers.arrayElement(["academic", "administration"]),
        
        position: faker.person.jobType(),
    
        title: faker.person.jobTitle(),

        attendances: new Array(10).fill(null).map(() => {

          const status = faker.helpers.arrayElement(["present", "absent"]);

          return {
            
            date: faker.date.recent(),
            
            status,
            
            hours: status === "absent" ? 0 : faker.number.int({ min: 0, max: 12 }),

            mandatory: 12

          }

        })

    }

  });
  
});
