import { Box, Text, Stack } from "@chakra-ui/react";
import { PaginationButton } from "./PaginationButton";

export function Pagination() {
  return (
    <Stack direction={["column", "row"]} mt="8" justify="space-between" spacing="6" align="center">
      <Box>
        <Text as="strong">0</Text> - <Text as="strong">10</Text> de{" "}
        <Text as="strong">100</Text>
      </Box>
      <Stack direction="row" spacing="2">
        <PaginationButton number="1" isCurrentPage={true} />
        <PaginationButton number="2" />
        <PaginationButton number="3" />
        <PaginationButton number="4" />
        <PaginationButton number="5" />
        <PaginationButton number="6" />
      </Stack>
    </Stack>
  );
}
