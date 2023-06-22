import React, { Button, ButtonGroup } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const PageButtons = () => {
  const { t } = useTranslation();
  return (
    <ButtonGroup
      spacing="3"
      justifyContent="space-between"
      width={{ base: 'full', md: 'auto' }}
      variant="secondary"
    >
      <Button> {t('Previous')} </Button>
      <Button> {t('Next')} </Button>
    </ButtonGroup>
  );
};

export default PageButtons;
