import * as Yup from 'yup';


export const LoginSchema = Yup.object().shape({
    password: Yup.string()
        .min(2, 'Mật khẩu phải dài hơn 2 ký tự!')
        .max(50, 'Mật khẩu không được quá 50 ký tự!')
        .required('Không được để trống password'),

    name: Yup.string()
        .min(2, 'Tên phải dài hơn 2 ký tự!')
        .max(50, 'Tên không được quá 50 ký tự!')
        .required('Không được để trống tên'),

});
export const SignUpSchema = Yup.object().shape({
    password: Yup.string()
        .min(2, 'Mật khẩu phải dài hơn 2 ký tự!')
        .max(50, 'Mật khẩu không được quá 50 ký tự!')
        .required('Không được để trống password'),
    email: Yup.string()
        .email('email không hợp lệ')
        .required('Không được để trống email'),
    name: Yup.string()
        .min(2, 'Tên phải dài hơn 2 ký tự!')
        .max(50, 'Tên không được quá 50 ký tự!')
        .required('Không được để trống tên'),

});