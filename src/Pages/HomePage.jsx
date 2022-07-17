import React, { useCallback, useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../Redux/AppReducer/action";
import { TaskCard } from "../Components/TaskCard";
import { useSearchParams } from "react-router-dom";

export const HomePage = () => {
  const [searchParams] = useSearchParams();
  const tasks = useSelector((state) => state.AppReducer.tasks);
  const dispatch = useDispatch();

  const getTaskHandler = useCallback(() => {
    dispatch(getTasks());
  }, [dispatch]);

  useEffect(() => {
    if (tasks.length === 0) {
      getTaskHandler();
    }
  }, [getTaskHandler, tasks.length]);

  const filterByParamsTypes = (task) => {
    const paramsTag = searchParams.getAll("tags");
    if (paramsTag.includes("All") || paramsTag.length === 0) {
      return task;
    }

    const data = task.tags.filter((tag) => {
      if (paramsTag.includes(tag)) {
        return true;
      } else {
        return false;
      }
    });
    if (data.length) {
      return task;
    } else {
      return false;
    }
  };

  return (
    <Box border="1px solid green" width="100%">
      <Flex>
        <Box border={"1px solid red"} width="250px" height={"95vh"}>
          <Box>
            <Text textAlign="center">Todo</Text>
          </Box>
          {tasks.length > 0 &&
            tasks
              .filter((item) => item.task_status === "todo")
              .filter(filterByParamsTypes)
              .map((item) => {
                return <TaskCard key={item.id} {...item} colorScheme="green" />;
              })}
        </Box>

        <Box border={"1px solid red"} width="250px" height={"95vh"}>
          <Text textAlign="center">In-Progress</Text>
          {tasks.length > 0 &&
            tasks
              .filter((item) => item.task_status === "in-progress")
              .filter(filterByParamsTypes)
              .map((item) => {
                return (
                  <TaskCard key={item.id} {...item} colorScheme="yellow" />
                );
              })}
        </Box>
        <Box border={"1px solid red"} width="250px" height={"95vh"}>
          <Text textAlign="center">Done</Text>
          {tasks.length > 0 &&
            tasks
              .filter((item) => item.task_status === "done")
              .filter(filterByParamsTypes)
              .map((item) => {
                return <TaskCard key={item.id} {...item} />;
              })}
        </Box>
      </Flex>
    </Box>
  );
};
