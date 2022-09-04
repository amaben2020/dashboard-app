import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  email: Yup.string().email().required('Required'),
  name: Yup.string().required('Required'),
  mobile: Yup.string().min(10).required('Required'),
  password: Yup.string()
    .min(7, 'Must be at least 7 characters')
    .max(255)
    .required('Required'),
  policy: Yup.boolean().oneOf([true], 'This field must be checked'),
});
