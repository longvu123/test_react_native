import ShareButton from '@/components/button/share.button';
import SocialButton from '@/components/button/social.button';
import ShareInput from '@/components/input/share.input';
import { APP_COLOR } from '@/utils/constain';
import { Link, router } from 'expo-router';

import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import { registerApi } from '@/utils/api';
import Toast from 'react-native-root-toast';
import { Formik } from 'formik';
import { SignUpSchema } from '@/utils/validate.schema';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    inputGroup: {
        gap: 7,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 5,
    },
    inputText: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderColor: "green",
        borderWidth: 1,
        borderRadius: 10,
        height: 40,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: "bold",
    }
})
const SignUpPage = () => {

    const API_URL = process.env.EXPO_PUBLIC_API_URL;


    const handSignUp = async (name: string, email: string, password: string) => {
        try {
            console.log("name", name);
            console.log("email", email);
            console.log("password", password);
            // Gọi api để thêm dữ liệu vào database
            const res = await registerApi(name, email, password);
            console.log("res", res);
            if (res.error) {
                //Add a Toast on screen.
                Toast.show(res.error, {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.TOP,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                    backgroundColor: "red",
                    textColor: '#fff',
                    opacity: 1
                });
            }
            if (res) {
                // Sau khi thêm xong thì sẽ set lại giá trị các ô input là rỗng để người dùng nhập lại thong tin và tránh bị lặp lại dữ liệu
                setName("");
                setEmail("");
                setPassword("");
                // Không nên dùng navigate trong trường hợp này vì nó chuyển sang login sẽ xuất hiện nút quay lại của navigate
                //router.navigate('/(auth)/login');
                // Mà dùng replace sẽ không hiện nút quay lại mà chỉ là sang màn hình login m
                router.replace('/(auth)/login');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Formik
                initialValues={{ name: '', email: '', password: '' }}
                onSubmit={
                    values => handSignUp(values.name, values.password, values.email)
                }
                validationSchema={SignUpSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View style={styles.container}>
                        <View>
                            <Text style={{ fontSize: 30, fontWeight: 'bold', paddingHorizontal: 10 }}>Đăng ký tài khoản</Text>
                        </View>
                        <ShareInput
                            label='Tên đăng nhập'
                            placeholder='Tên đăng nhập'
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                            error={errors.name}

                        />
                        <ShareInput
                            label='Email'
                            placeholder='Email'
                            keyboardType='email-address'
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            error={errors.email}
                        />
                        <ShareInput
                            label='Mật khẩu'
                            placeholder='Mật khẩu'
                            secureTextEntry={true}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            error={errors.password}
                        />
                        <View style={{ marginVertical: 10 }}></View>
                        <View >
                            <ShareButton
                                title='Đăng ký'
                                onPress={handleSubmit as any}
                                btnStyle={{
                                    backgroundColor: APP_COLOR.ORANGE,
                                    marginHorizontal: 50,
                                    paddingVertical: 10,
                                    borderRadius: 30,
                                    justifyContent: "center",
                                    gap: 10,
                                    borderColor: "#fff",
                                    borderWidth: 1,
                                }}
                                textStyle={{ color: "#fff", paddingVertical: 5 }}
                                pressStyle={{ alignSelf: "stretch" }}
                            />
                        </View>

                        <View style={{ alignItems: "center", paddingTop: 20 }}>
                            <Text style={{ color: "black" }}>
                                Bạn đã có tài khoản
                                <Link href={"/(auth)/login"}>
                                    <Text style={{ textDecorationLine: "underline" }}> Đăng nhập. </Text>
                                </Link>
                            </Text>
                        </View>
                        <SocialButton />
                    </View>
                )}
            </Formik>

        </View>
    )
}
export default SignUpPage;