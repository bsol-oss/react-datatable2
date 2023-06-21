import React, { ReactNode } from 'react';
import { Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

interface Props {
  children: ReactNode;
}

const TableTitle = ({ children }: Props) => {
  const { t } = useTranslation();

  return (
    <Text fontSize="lg" fontWeight="medium">
      {t(`${children}`)}
    </Text>
  );
};

export default TableTitle;
