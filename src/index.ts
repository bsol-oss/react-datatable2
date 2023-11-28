// export DataTable component
import DataTable from './components/DataTable';

//export FunctionalComponents
import Header from './components/Header'; // Header
import GlobalSearch from './components/functionalcomponents/GlobalSearch'; // Global Searchbar component
import TableTitle from './components/functionalcomponents/TableTitle'; // TitleComponent

//export BodyComponents
import Table from './components/Table'; // Table component
import TableHeader from './components/bodycomponents/TableHeader'; // TableHeader Component
import TableBody from './components/bodycomponents/TableBody'; // TableBody Component

import ColumnSearch from './components/bodycomponents/ColumnSearch'; // Field Searchbar component
import DropdownFilter from './components/bodycomponents/DropdownFilter'; // Dropdown filter component

//export Footer components
import Footer from './components/Footer'; // Footer component
import Pagination from './components/footercomponents/Pagination'; // Pagination Component
import PageSizeControl from './components/footercomponents/PageSizeControl'; // PageSizeControl Component
import SelectedNumber from './components/footercomponents/SelectedNumber'; // SelectedNumber Component

//export ThemeToggleButton component
import ThemeToggleButton from './components/globalpartials/ThemeToggleButton';

// export DataTableServer component
import DataTableServer from './DataTableServer';

export {
  DataTable,
  DataTableServer,
  Header,
  GlobalSearch,
  TableTitle,
  Table,
  TableHeader,
  TableBody,
  ColumnSearch,
  DropdownFilter,
  Footer,
  Pagination,
  PageSizeControl,
  SelectedNumber,
  ThemeToggleButton,
};
