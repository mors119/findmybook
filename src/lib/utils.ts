export const generatePagination = (currentPage: number, totalPages: number) => {
  // 전체 페이지 수가 7개 이하인 경우,
  // 줄임표 없이 모든 페이지를 표시합니다.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  // 현재 페이지가 처음 3페이지 중 하나인 경우,
  // 처음 3개의 페이지와 줄임표, 그리고 마지막 2개의 페이지를 표시합니다.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // 현재 페이지가 마지막 3페이지 중 하나인 경우,
  // 처음 2개의 페이지와 줄임표, 그리고 마지막 3개의 페이지를 표시합니다.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // 현재 페이지가 중간 어딘가에 있는 경우,
  // 첫 페이지, 줄임표, 현재 페이지와 그 이웃한 페이지들,
  // 또 다른 줄임표, 그리고 마지막 페이지를 표시합니다.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
