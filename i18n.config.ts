export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
      en: {
        colleges_and_departments: {
          title: 'Colleges & Departments',
          table: {
            columns: {
              code: 'Code',
              name_in_english: 'Name in English',
              name_in_arabic: 'Name in Arabic',
              name_in_kurdish: 'Name in Kurdish',
            },
            form: {
              code: { placeholder: "Code" },
              name_in_english: { placeholder: "Name in English" },
              name_in_arabic: { placeholder: "Name in Arabic" },
              name_in_kurdish: { placeholder: "Name in Kurdish" }
            },
            add_new_department_button: 'Add New Department',
            add_new_college_button: 'Add New College'
          }
        }
      }
    }
  }))