export type gender = "male" | "female";

export type imageUrl = "male" | "female";

export interface Student {

    first_name: string,
    second_name: string,
    third_name: string,
    fourth_name: string,
    surname: string,

    gender: gender,
    
    father_job: string,

    mother_name: string,
    mother_job: string,
    
    nationality: string,
    profile_image: imageUrl,

    address_1: string,
    address_2: string,

    city: string,
    state: string,
    zip: string,

    university_city: string,
    university_province: string,
    university_region: string,
    university_full_address: string,
    university_nearst_location: string,


}