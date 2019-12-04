import validator from 'validator';
class FormValidator {
  constructor(validations) {
    // validations is an array of rules specific to a form
    this.validations = validations;
    this.validation = {}
  }
  setOnTouch(field) {
    const vs = this.validations.filter((rule) => rule.field === field)
    vs.forEach((v) => v.onTouch = true)
  }
  reset() {
    this.validations.forEach((rule) => rule.onTouch = false)
    this.validation = this.valid()
  }
  validate(state, isAll) {
    // start out assuming valid
    this.validation = this.valid();
    // for each validation rule
    this.validations.forEach(rule => {

      // if the field isn't already marked invalid by an earlier rule
      if (isAll || (!this.validation[rule.field].isInvalid && rule.onTouch)) {
        // determine the field value, the method to invoke and
        // optional args from the rule definition
        // console.log("@state", state)
        // console.log("rule.field", rule.field)
        const field_value = state[rule.field].toString();
        const args = rule.args || [];
        const validation_method = typeof rule.method === 'string' ?
          validator[rule.method] :
          rule.method
        // call the validation_method with the current field value
        // as the first argument, any additional arguments, and the
        // whole state as a final argument.  If the result doesn't
        // match the rule.validWhen property, then modify the
        // validation object for the field and set the isValid
        // field to false
        if (validation_method(field_value, ...args, state) !== rule.validWhen) {
          this.validation[rule.field] = {
            isInvalid: true,
            message: rule.message
          }
          this.validation.isValid = false;
        }
      }
    });
    return this.validation;
  }
  // create a validation object for a valid form
  valid() {
    const validation = {}

    this.validations.map(rule => (
      validation[rule.field] = { isInvalid: false, message: '' }
    ));
    return { isValid: true, ...validation };
  }
}
export default FormValidator;
