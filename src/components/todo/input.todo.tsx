import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View, Alert } from 'react-native';

import MineButton from '../button/mine.button';
const styles = StyleSheet.create({
    todoInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 80,
        marginBottom: 10,
        padding: 10,
    },
});
interface Iprops {
    addTodoInput: (v: string) => void;
}
const InputTodo = (props: Iprops) => {
    const { addTodoInput } = props;
    const [name, setName] = useState<string>("");
    const addDataTodo = () => {
        if (!name) {
            // alert('Vui lòng nhập tên');
            Alert.alert('Lỗi', 'Vui lòng nhập data');
            return;
        }
        addTodoInput(name);
        setName("");
    }
    return (
        <>
            <View>
                <TextInput
                    onChangeText={v => setName(v)}
                    autoCapitalize='none'
                    value={name}
                    autoCorrect={false}
                    style={styles.todoInput}
                />


                <MineButton title='Thêm mới' onPress={addDataTodo} />
            </View>
        </>
    )
}
export default InputTodo;