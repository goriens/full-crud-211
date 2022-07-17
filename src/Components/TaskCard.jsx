import { EditIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const TaskCard = ({
  id,
  title,
  description,
  tags,
  subtask,
  colorScheme = "green",
}) => {
  const [checkBox, setCheckBox] = useState(() => {
    let data = subtask
      .filter((item) => {
        return item.status && item.subTaskTitle;
      })
      .map((item) => item.subTaskTitle);
    return data;
  });

  return (
    <Box width={"230px"} padding="10px" border="1px solid red" margin="auto">
      <Flex justifyContent="space-between">
        <Text>{title}</Text>
        <Link to={`/task/${id}`}>
          <EditIcon />
        </Link>
      </Flex>
      <Box>
        <Stack direction="row">
          {tags.length &&
            tags.map((item, index) => {
              return (
                <Badge key={index} colorScheme={colorScheme} fontSize={"9px"}>
                  {item}
                </Badge>
              );
            })}
        </Stack>
      </Box>
      <Text>{description}</Text>
      <Box>
        <CheckboxGroup defaultValue={checkBox}>
          {subtask.length &&
            subtask.map((item, index) => (
              <Checkbox key={index} value={item.subTaskTitle}>
                {item.subTaskTitle}
              </Checkbox>
            ))}
        </CheckboxGroup>
      </Box>
    </Box>
  );
};
