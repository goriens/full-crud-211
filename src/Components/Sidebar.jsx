import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Stack, Button, Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux/es/exports";
import { useSearchParams } from "react-router-dom";

export const Sidebar = () => {
  const isAuth = useSelector((state) => state.AuthReducer.isAuth);

  const tasks = useSelector((state) => state.AppReducer.tasks);
  const personalTasks = tasks.filter((item) => item.tags.includes("Personal"));
  const officialTasks = tasks.filter((item) => item.tags.includes("Official"));
  const othersTasks = tasks.filter((item) => item.tags.includes("Others"));
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTag, setSelectedTag] = useState(
    searchParams.getAll("tags") || []
  );

  const handleTagChange = (tag) => {
    let newSelectedTags = [...selectedTag];
    if (selectedTag.includes(tag)) {
      newSelectedTags.splice(newSelectedTags.indexOf(tag), 1);
    } else {
      newSelectedTags.push(tag);
    }
    setSelectedTag(newSelectedTags);
  };

  useEffect(() => {
    if (selectedTag) {
      setSearchParams({ tags: selectedTag });
    }
  }, [selectedTag, setSearchParams]);

  return (
    <Box border="1px solid blue" width="250px" height="100vh">
      <Stack>
        <Box height="20vh" border="1px solid red"></Box>
        <Box height="60vh" border="1px solid red">
          <Flex direction="column" gap="5px" margin="5px">
            <Box
              border="1px solid blue"
              padding="5px 0"
              onClick={() => {
                handleTagChange("All");
              }}
              backgroundColor={
                selectedTag.includes("All") ? "blue.400" : "blue.100"
              }
            >
              <Flex padding="0 20px">
                <Text>All</Text>
                <Text marginLeft={"auto"}>{tasks.length}</Text>
              </Flex>
            </Box>
            <Box
              border="1px solid blue"
              onClick={() => {
                handleTagChange("Personal");
              }}
              backgroundColor={
                selectedTag.includes("Personal") ? "green.400" : "green.100"
              }
            >
              <Flex padding="0 20px">
                <Text>Personal</Text>
                <Text marginLeft={"auto"}>{personalTasks.length}</Text>
              </Flex>
            </Box>
            <Box
              border="1px solid blue"
              onClick={() => {
                handleTagChange("Official");
              }}
              backgroundColor={
                selectedTag.includes("Official") ? "purple.400" : "purple.100"
              }
            >
              <Flex padding="0 20px">
                <Text>Official</Text>
                <Text marginLeft={"auto"}>{officialTasks.length}</Text>
              </Flex>
            </Box>
            <Box
              border="1px solid blue"
              onClick={() => {
                handleTagChange("Others");
              }}
              backgroundColor={
                selectedTag.includes("Others") ? "orange.400" : "orange.100"
              }
            >
              <Flex padding="0 20px">
                <Text>Others</Text>
                <Text marginLeft={"auto"}>{othersTasks.length}</Text>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Box height="10vh" border="1px solid red">
          <Button width="100%">{isAuth && "LOGOUT"}</Button>
        </Box>
      </Stack>
    </Box>
  );
};
