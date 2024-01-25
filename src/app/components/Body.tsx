'use client'
import React, { useMemo, useState } from 'react'
import Table from './Table'
import FilterInputs from './FilterInputs'

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
      <Table data={filteredData} searchName={searchName}/>
    </main>
  )
}

export default Body