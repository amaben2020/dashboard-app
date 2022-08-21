import React, { useState, ChangeEvent } from 'react';
import clsx from 'clsx';
import numeral from 'numeral';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Image as ImageIcon,
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
  Search as SearchIcon,
} from 'react-feather';
import {
  Box,
  Button,
  Card,
  Checkbox,
  InputAdornment,
  FormControlLabel,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  makeStyles,
} from '@material-ui/core';
import {
  availabilityOptions,
  categoryOptions,
  sortOptions,
} from 'helpers/inputProductOptions';
import {
  applyFilters,
  applyPagination,
  TableResultsHelpers,
  getInventoryLabel,
} from './TableResultsHelpers';
import { ProductType } from 'models/product-type';

type Props = {
  className?: string;
  products?: ProductType[];
};

const Results = ({ className, products, ...rest }: Props) => {
  const classes = useStyles();

  //Explicitly stating that selectedProducts is an array of type string
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10); // no of products per page
  const [query, setQuery] = useState('');
  /* Explicitly stating that sort is an array of type string so we'll know 
on mouser hover that value is of type string. */
  const [sort, setSort] = useState<string>(sortOptions[0].value);
  const [filters, setFilters] = useState<TableResultsHelpers | any>({
    category: null,
    availability: null,
    inStock: null,
    isShippable: null,
  });

  return (
    <div>
      <h1>Results - ListView - Works! </h1>
    </div>
  );
};
const useStyles = makeStyles(theme => ({
  root: {},
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1),
    },
  },
}));
export default Results;
