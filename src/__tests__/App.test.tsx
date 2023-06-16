import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataTable from '../components/DataTable';

describe('DataTable', () => {
  it('renders children', () => {
    const { getByText } = render(
      <DataTable>
        <div>Child component</div>
      </DataTable>
    );
    expect(getByText('Child component')).toBeInTheDocument();
  });
});
