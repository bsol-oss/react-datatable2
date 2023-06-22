import React, { useContext } from 'react';
import { Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
  PaginationContext,
  SelectedRecordsContext,
} from '../globalpartials/GlobalContext';

const SelectedNumber = () => {
  const { t } = useTranslation();
  const { totalCount } = useContext(PaginationContext);
  const { selectedRecords } = useContext(SelectedRecordsContext);

  return (
    <Text color="fg.muted" fontSize="sm" ml="5">
      {selectedRecords} {t('of')} {totalCount} {t('Total Rows Selected')}
    </Text>
  );
};

export default SelectedNumber;
