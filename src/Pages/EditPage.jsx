import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux/es/exports";
import { useParams } from "react-router-dom";
import {
  addSubTasks,
  deleteSubTasks,
  getTasks,
  updateTask,
} from "../Redux/AppReducer/action";
import { useDispatch } from "react-redux";

export const EditPage = () => {
  const { id } = useParams();
  const tasks = useSelector((state) => state.AppReducer.tasks);
  //   console.log(tasks, Number(id));
  const dispatch = useDispatch();

  const [taskTitle, setTaskTitle] = useState();
  const [taskDescription, setTaskDescription] = useState();
  const [taskStatus, setTaskStatus] = useState("");
  const [taskTags, setTaskTag] = useState([]);
  const [subTask, setSubTask] = useState([]);
  const [checkBox, setCheckBox] = useState([]);
  const [currentSubTask, setCurrentSubTask] = useState("");
  console.log(subTask);

  const addSubTask = (e) => {
    e.preventDefault();
    if (currentSubTask) {
      const newSubTasks = [
        ...subTask,
        { subTaskTitle: currentSubTask, status: false },
      ];

      dispatch(addSubTasks(id, { subtask: newSubTasks }))
        .then(() => dispatch(getTasks()))
        .then(() => {
          setCurrentSubTask("");
        });
    }
  };

  const updateHandler = (type, value) => {
    if (type === "textAndDescription") {
      dispatch(
        updateTask(id, {
          title: taskTitle,
          description: taskDescription,
        })
      ).then(() => dispatch(getTasks()));
    } else if (type === "taskStatus") {
      dispatch(
        updateTask(id, {
          task_status: value,
        })
      ).then(() => dispatch(getTasks()));
    } else if (type === "taskTags") {
      dispatch(
        updateTask(id, {
          tags: value,
        })
      ).then(() => dispatch(getTasks()));
    }
  };
  const updateSubtaskStatus = (checkBoxValues) => {
    let newData = subTask.map((item) => {
      if (checkBoxValues.includes(item.subTaskTitle)) {
        return {
          ...item,
          status: true,
        };
      }
      return { ...item, status: false };
    });
    dispatch(addSubTasks(id, { subtask: newData })).then(() => {
      dispatch(getTasks());
    });
  };
  const handleDelete = (title) => {
    let newData = subTask.filter((item) => item.subTaskTitle !== title);
    dispatch(deleteSubTasks(id, { subtask: newData })).then(() =>
      dispatch(getTasks())
    );
  };

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(getTasks());
    }
  }, [dispatch, tasks.length]);

  useEffect(() => {
    if (tasks) {
      const currentTask = tasks.find((item) => item.id === Number(id));
      if (currentTask) {
        setTaskTitle(currentTask.title);
        setTaskDescription(currentTask.description);
        setTaskStatus(currentTask.task_status);
        setTaskTag(currentTask.tags);
        setSubTask(currentTask.subtask);
        let data = currentTask.subtask
          .filter((item) => {
            return item.status && item.subTaskTitle;
          })
          .map((item) => item.subTaskTitle);
        setCheckBox(data);
      }
    }
  }, [id, tasks]);
  return (
    <Box border="1px solid green" width="100%">
      <Flex justifyContent="space-around">
        <Box border="1px solid red" width="200px" height="90vh">
          <Box mt="3vh">
            <Stack>
              <Input
                value={taskTitle}
                placeholder="title"
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <Editable value={taskDescription}>
                <EditablePreview />
                <EditableTextarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </Editable>
              <Button
                onClick={() => {
                  updateHandler("textAndDescription");
                }}
              >
                Update
              </Button>
            </Stack>
          </Box>
          <Box>
            <RadioGroup
              onChange={(value) => {
                setTaskStatus(value);
                updateHandler("taskStatus", value);
              }}
              value={taskStatus}
            >
              <Stack>
                <Radio value="todo">Todo</Radio>
                <Radio value="in-progress">In-progress</Radio>
                <Radio value="done">Done</Radio>
              </Stack>
            </RadioGroup>
          </Box>
          <Box>
            <Text>Tags</Text>
            <CheckboxGroup
              colorScheme="green"
              value={taskTags}
              onChange={(e) => {
                setTaskTag(e);
                updateHandler("taskTags", e);
              }}
            >
              <Stack spacing={[1, 2]}>
                <Checkbox value="Official">Official</Checkbox>
                <Checkbox value="Personal">Personal</Checkbox>
                <Checkbox value="Others">Others</Checkbox>
              </Stack>
            </CheckboxGroup>
          </Box>
        </Box>
        <Box border="1px solid blue" width="300px" height="90vh">
          <form onSubmit={addSubTask}>
            <Flex>
              <Input
                placeholder="Add new sub task"
                value={currentSubTask}
                onChange={(e) => setCurrentSubTask(e.target.value)}
              />
              <Button ml="0.5rem" type="submit">
                Add
              </Button>
            </Flex>
          </form>
          <Flex direction="column">
            <CheckboxGroup
              defaultValue={checkBox}
              onChange={(value) => {
                setCheckBox(value);
                updateSubtaskStatus(value);
              }}
            >
              {subTask.length &&
                subTask.map((item, index) => (
                  <Flex key={index} justifyContent="space-between" p={"7px"}>
                    <Checkbox value={item.subTaskTitle}>
                      {item.subTaskTitle}
                    </Checkbox>
                    <DeleteIcon
                      cursor="pointer"
                      onClick={() => handleDelete(item.subTaskTitle)}
                    />
                  </Flex>
                ))}
            </CheckboxGroup>
          </Flex>
        </Box>
        <Box border="1px solid red" width="250px" height="90vh"></Box>
      </Flex>
    </Box>
  );
};
