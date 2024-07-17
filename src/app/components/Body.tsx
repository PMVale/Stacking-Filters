'use client'
import React, { useMemo, useState } from 'react'
import Table from './Table'
import FilterInputs from './FilterInputs'
import ActiveFilters from './ActiveFilters'

type BodyProps = {
  apiData: {
    [key: string]: string | string[];
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    films: string;
    residents: string[];
    created: string;
    edited: string;
    url: string;
  }[]
}

type DeployedFilters = {
  column: string, comparison: string, value: number
}

const Body: React.FC<BodyProps> = ({apiData}) => {
  const [filteredData, setFilteredData] = useState(apiData);
  const [searchName, setSearchName] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const initialFilters: DeployedFilters[] = [];
  const [deployedFilters, setDeployedFilters] = useState(initialFilters);
  const [comparisonFilter, setComparisonFilter] = useState('higher');
  const [valueFilter, setValueFilter] = useState(0);
  const [columnTypes, setColumnTypes] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water', '']);

  const handleDeployedFilters = () => {
    setDeployedFilters((prevFilters) => [...prevFilters, {
      column: columnFilter,
      comparison: comparisonFilter,
      value: valueFilter
    }]);
  }

  const handleFilter = () => {
    handleDeployedFilters();
    switch (comparisonFilter) {
      case 'higher':
        setFilteredData((prevData) => prevData.filter((item) => Number(item[columnFilter]) > valueFilter));
        break;
      case 'lower':
        setFilteredData((prevData) => prevData.filter((item) => Number(item[columnFilter]) < valueFilter));
        break;
      case 'equal':
        setFilteredData((prevData) => prevData.filter((item) => Number(item[columnFilter]) === valueFilter));
        break;
    }
  }

  const handleOptions = (type:string) => {
    const types = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water', ''];

    let unsortedTypes = [...columnTypes, type];
    const sortedArr: string[] = [];

    types.forEach((item) => {
      const sortedTypes = unsortedTypes.filter((item2) => item2 === item);
      sortedArr.push(...sortedTypes);
      unsortedTypes = unsortedTypes.filter((item3) => item3 !== item);
    });

    setColumnTypes([...sortedArr]);
    setColumnFilter(sortedArr[0])
  };

  const removeFilter = (filterIndex: number, type:string) => {
    handleOptions(type);
    let newFilteredData = [...apiData];
    const newFilters = [...deployedFilters.filter((_item, index) => index !== filterIndex)];
    setDeployedFilters([...newFilters]);

    newFilters.forEach((filter) => {
      if (filter.comparison === 'higher') {
        newFilteredData = newFilteredData.filter((item) => Number(item[filter.column]) > filter.value);
      }
      if (filter.comparison === 'lower') {
        newFilteredData = newFilteredData.filter((item) => Number(item[filter.column]) < filter.value);
      }
      if (filter.comparison === 'equal') {
        newFilteredData = newFilteredData.filter((item) => Number(item[filter.column]) === filter.value);
      }
    });

    setFilteredData([...newFilteredData]);
  }

  const inputStates = useMemo(() => ({
    searchName,
    setSearchName,
    columnFilter,
    setColumnFilter,
    deployedFilters,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
    handleFilter
  }), [searchName, columnFilter, deployedFilters, comparisonFilter, valueFilter]);

  return (
    <main>
      <FilterInputs inputStates={inputStates}/>
      <ActiveFilters deployedFilters={deployedFilters} removeFilter={removeFilter}  />
      <Table data={filteredData} searchName={searchName}/>
    </main>
  )
}

export default Body