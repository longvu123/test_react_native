import ShareButton from "@/components/button/share.button";
import SocialButton from "@/components/button/social.button";
import ShareInput from "@/components/input/share.input";
import { loginApi } from "@/utils/api";
import { APP_COLOR } from "@/utils/constain";
import { Link, router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-root-toast";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LoginSchema } from "@/utils/validate.schema";
import { useCurrentApp } from "@/context/app.context";
import { useAuth } from "@/context/auth.context";
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
const LoginPage = () => {
    // const [name, setName] = useState<string>("");

    // const [password, setPassword] = useState<string>("");
    const [isLogin, setIsLogin] = useState(0);
    const [isClick, setIsClick] = useState<boolean>(false);
    //const { setAppState } = useCurrentApp();
    // Sử dụng useAuth thay vì useCurrentApp
    const { login } = useAuth();
    const handLogin = async (name: string, password: string) => {
        try {
            const isLogin = 0;
            setIsClick(true);

            await login(name, password);
            Toast.show("Đăng nhập thành công", {
                duration: 3000,
            });
            router.replace({
                pathname: "/(tabs)"
            });

        } catch (error) {
            Toast.show("Đăng nhập thất bại", {
                duration: 3000,
            });
            console.log(error);
        } finally {
            setIsClick(false);
        }
    }

    return (

        <View style={styles.container}>
            <Formik
                initialValues={{ name: '', password: '' }}
                onSubmit={
                    values => handLogin(values.name, values.password)
                }
                validationSchema={LoginSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View style={styles.container}>
                        <View>
                            <Text style={{ fontSize: 30, fontWeight: 'bold', paddingHorizontal: 10 }}>Đăng nhập</Text>
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
                            label='Mật khẩu'
                            placeholder='Mật khẩu'
                            secureTextEntry={true}
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            error={errors.password}
                        />
                        <View style={{ marginVertical: 10 }}></View>
                        <View >
                            <ShareButton
                                disabled={isClick}
                                title='Đăng Nhập'
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


                        <SocialButton />
                    </View>

                    // <View style={{ margin: 10 }}>
                    //     <Text>Email</Text>
                    //     <TextInput
                    //         style={{ borderWidth: 1, borderColor: "#ccc" }}
                    //         onChangeText={handleChange('email')}
                    //         onBlur={handleBlur('email')}
                    //         value={values.email}
                    //     />
                    //     {errors.email && <Text style={{ color: "red" }}>{errors.email} </Text>}
                    //     <View style={{ marginVertical: 10 }}></View>
                    //     <Text>Password</Text>
                    //     <TextInput
                    //         style={{ borderWidth: 1, borderColor: "#ccc" }}
                    //         onChangeText={handleChange('password')}
                    //         onBlur={handleBlur('password')}
                    //         value={values.password}
                    //     />
                    //     {errors.password && <Text style={{ color: "red" }}>{errors.password} </Text>}
                    //     <View style={{ marginVertical: 10 }}></View>
                    //     <Button onPress={handleSubmit as any} title="Submit" />
                    // </View>
                )}
            </Formik>
        </View>
    );
}
export default LoginPage;