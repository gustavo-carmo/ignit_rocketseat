import { Button } from "@chakra-ui/react";

interface PaginationButtonProps {
  isCurrentPage?: boolean;
  number: string;
}

export function PaginationButton({
  isCurrentPage = false,
  number,
}: PaginationButtonProps) {
  return isCurrentPage ? (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      colorScheme="pink"
      disabled
      _disabled={{
        bg: "pink.500",
        cursor: "default",
      }}
    >
      {number}
    </Button>
  ) : (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg="gray.700"
      _hover={{
        bg: "gray.500",
      }}
    >
      {number}
    </Button>
  );
}
