import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");

  const addTask = () => {
    if (taskTitle.trim() === "") return;
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskTitle("");
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />
      <Button title="Add Task" onPress={addTask} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {tasks.map((task) => (
          <View key={task.id} style={styles.taskContainer}>
            <Text style={styles.taskText}>
              {task.title} - {task.completed ? "Completed" : "Incomplete"}
            </Text>
            <Button
              title="Toggle Complete"
              onPress={() => toggleTaskCompletion(task.id)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
  },
  scrollContainer: {
    width: "100%",
    marginTop: 20,
  },
  taskContainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  taskText: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default TaskManager;
