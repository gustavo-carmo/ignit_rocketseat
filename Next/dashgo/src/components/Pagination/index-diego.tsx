import { Box, Text, Stack } from "@chakra-ui/react";
import { PaginationButton } from "./PaginationButton";

type PaginationProps = {
  totalCountOfRegisters: number;
  totalPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return index + 1 + from;
    }).filter(page => page > 0);
}


export function Pagination({ currentPage = 1, totalCountOfRegisters, totalPerPage = 10, onPageChange }: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / totalPerPage);
  const pageStart = ((currentPage - 1) * totalPerPage) + 1;
  const pageEnd = currentPage === lastPage ? totalCountOfRegisters : currentPage * totalPerPage;

  const previousPages = currentPage > 1 ?
    generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1) :
    []

  const nextPages = currentPage < lastPage ?
    generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage)) :
    [];



  return (
    <Stack direction={["column", "row"]} mt="8" justify="space-between" spacing="6" align="center">
      <Box>
        <Text as="strong">{pageStart}</Text> - <Text as="strong">{pageEnd}</Text> de{" "}
        <Text as="strong">{totalCountOfRegisters}</Text>
      </Box>
      <Stack direction="row" spacing="2">

        {(1 + siblingsCount) < currentPage && (
          <>
            <PaginationButton onPageChange={onPageChange} number={1} />
            {currentPage > (2 + siblingsCount) && (
              <Text color="gray.300" width="8" textAlign="center" alignSelf="flex-end">...</Text>
            )}
          </>
        )}

        { previousPages.length > 0 && previousPages.map(page => (
          <PaginationButton onPageChange={onPageChange} key={page} number={page} />
        ))}

        <PaginationButton onPageChange={onPageChange} number={currentPage} isCurrentPage={true} />


        { nextPages.length > 0 && nextPages.map(page => (
          <PaginationButton onPageChange={onPageChange} key={page} number={page} />
        ))}

        {currentPage + siblingsCount < lastPage && (
          <>
            {(currentPage + 1 + siblingsCount) < lastPage && (
              <Text color="gray.300" width="8" textAlign="center" alignSelf="flex-end">...</Text>
            )}
            <PaginationButton onPageChange={onPageChange} number={lastPage} />
          </>
        )}

      </Stack>
    </Stack>
  );
}
