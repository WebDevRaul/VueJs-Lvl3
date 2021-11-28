import { Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure } from 'vee-validate';
import { required, min, max, alpha_spaces as alphaSpaces, email, min_value as minValue, max_value as maxValue, confirmed, not_one_of as excluded } from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('tos', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('email', email);
    defineRule('min_value', minValue);
    defineRule('max_value', maxValue);
    defineRule('confirmed', confirmed);
    defineRule('excluded', excluded);
    defineRule('country_excluded', excluded);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The ${ctx.field} field is required!`,
          tos: 'You must accept the Term of Service',
          min: `The ${ctx.field} field is to short!`,
          max: `The ${ctx.field} field is to long!`,
          alpha_spaces: `The ${ctx.field} field may only contain alphabetic characters and spaces!`,
          email: `The ${ctx.field} field must be a valid email!`,
          min_value: `The ${ctx.field} field is to low!`,
          max_value: `The ${ctx.field} field is to heigh!`,
          confirmed: 'The passwords do not match!',
          excluded: `You are not allowed to use this value for the field ${ctx.field}!`,
          country_excluded: 'Due to restriction, we do not accept users from this location!'
        };
        const message = messages[ctx.rule.name] ? messages[ctx.rule.name] : `The field ${ctx.field} is invalid!`;
        return message;
      },
      validateOnBlur: false,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true
    });
  }
};