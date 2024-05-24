import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Text from './Text/Text';

interface PaginationProps {
  currentPage: number;
  totalPages?: number;
  handlePageClick: (i: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  handlePageClick,
}: PaginationProps) => {
  // if (search !== '' || categoryId !== '') return; // u can remove this in future versions

  const maxButtonsToShow = 5;
  let startPage = Math.max(0, currentPage - Math.floor(maxButtonsToShow / 2));

  let endPage = Math.min(Number(totalPages), startPage + maxButtonsToShow - 1);

  if (endPage - startPage + 1 < maxButtonsToShow) {
    startPage = Math.max(0, endPage - maxButtonsToShow + 1);
  }

  const buttons = [];

  for (let i = startPage; i <= endPage; i++) {
    const isLastPage = i === totalPages;
    buttons.push(
      <TouchableOpacity
        key={i}
        onPress={() => handlePageClick(i)}
        disabled={isLastPage}
        style={[
          styles.paginationButton,
          i === currentPage ? styles.activeButton : styles.inActiveButton,
        ]}>
        <Text
          style={
            i === currentPage ? styles.buttonTextActive : styles.buttonText
          }>
          {i}
        </Text>
      </TouchableOpacity>,
    );
  }

  return buttons;
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: 'red',
  },
  paginationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: 'transparent',
  },
  activeButton: {
    backgroundColor: '#F06D06',
    width: 35,
    height: 35,
    borderRadius: 25,
  },
  inActiveButton: {
    backgroundColor: 'transparent',
    width: 35,
    height: 35,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#888',
  },
  buttonTextActive: {
    color: 'white',
  },
  buttonText: {
    color: '#8888',
  },
});
