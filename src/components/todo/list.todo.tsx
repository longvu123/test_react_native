import React, { Fragment } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    todolist: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'pink',
    },
});
interface Iprops {
    todoList: ITodo[];
    deleteTodo: (v_id: number) => void;
}
const ListTodo = (props: Iprops) => {
    const { todoList } = props;
    const { deleteTodo } = props;
    return (
        <>
            <FlatList data={todoList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {

                    return (
                        <TouchableOpacity
                            onPress={() => {
                                deleteTodo(item.id);
                            }
                            }
                        >
                            <Text
                                style={styles.todolist} >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </>
    )
}
export default ListTodo;