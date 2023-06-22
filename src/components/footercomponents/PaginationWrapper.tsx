import React, { ReactNode, useContext } from 'react';
import {
  Box,
  Text,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
  PaginationContext,
} from '../globalpartials/GlobalContext';

interface Props {
  children: ReactNode;
}
const PaginationWrapper = ({ children }: Props) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { t } = useTranslation();
  const { totalCount } = useContext(PaginationContext);

  return (
    <Box>
      {!isMobile && (
        <HStack>
          <Text color="fg.muted" fontSize="sm">
            {t('Showing 1 to ')} {totalCount} {t('of ')} {totalCount}{' '}
            {t(' results')}
          </Text>
          {children}
        </HStack>
      )}
    </Box>
  );
};

export default PaginationWrapper;
