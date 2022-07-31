type FormSimpleValidators = "required" | "string" | "number" | "email" | "strongPassword"
type FormConfirmValidator = {confirm: string}

export type FormValidator = FormSimpleValidators | FormConfirmValidator
export type FormValidators = (FormSimpleValidators | FormConfirmValidator)[]
export type FieldValidation = {name: string, value: string|number, validators:FormValidators}
export type FieldValidations = FieldValidation[]
export type ValidationError = {name:string, message:string}
export type ValidationErrors = ValidationError[]
export type FieldError = string | false

export class FormValidation{
  private errors:ValidationErrors =[];

  /**
   * Test validation of form fields
   *
   * @param fields
   * @returns
   */
  validations(fields: FieldValidation[]): {valid:boolean, errors:ValidationErrors}{
    var valid = true;
    var errors: ValidationErrors = [];

    fields.forEach(field => {
      field.validators.forEach(validator => {
        // check for simple valitators
        switch(validator){
          case "required":
            if(!field.value){
              valid = false
              errors.push({name:field.name, message:"Ce champ est obligatoir"})
            }
            break;
          case "string":
            if(typeof field.value != 'string'){
              valid = false
              errors.push({name:field.name, message:"Ce champ doit contenir une chaine de caractères"})
            }
            break;
          case "number":
            if(typeof field.value != 'number'){
              valid = false
              errors.push({name:field.name, message:"Ce champ doit contenir une chaine de caractères"})
            }
            break;
          case "email":
            var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if(typeof field.value =="string" && !regex.test(field.value)){
              valid = false
              errors.push({name:field.name, message:"Ce champ doit contenir une adresse email valide"})
            }
            break;
          case "strongPassword":
            var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
            if(typeof field.value =="string" && !regex.test(field.value)){
              valid = false
              errors.push({name:field.name, message:"Le mot de passe doit contenir minnimum 8 lettres, inclure une lettre majuscule, une lettre miniscule et un chiffre"})
            }
            break;
        }

        //check for confirm validator
        if(typeof validator != "string" && validator.confirm){
          var confirmField = fields.find(confirmField => confirmField.name == validator.confirm)

          if(confirmField?.value !== field.value){
            errors.push({name:field.name, message:`La confirmation est incorrecte`})
          }
        }
      });
    });

    this.errors = errors
    return {valid, errors}
  }

  /**
   * Get error of form field by name
   *
   * @param fieldName
   * @returns
   */
  getFieldError(fieldName: string): FieldError{
    const error = this.errors.find(error => error.name == fieldName)
    return error ? error.message : false
  }
}
