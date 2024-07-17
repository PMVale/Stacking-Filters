import React from 'react'

type ActiveFiltersProps = {
  deployedFilters: {
    column: string, comparison: string, value: number
  }[];
  removeFilter: (filterIndex:number ,type: string) => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({deployedFilters, removeFilter}) => {
  return (
    <section>
      {deployedFilters.length > 0 && (
        deployedFilters.map((item, index) => (
          <div key={item.column}>
            <span>{`${item.column} ${item.comparison} ${item.value}`}</span>
            <button
              onClick={() => removeFilter(index, item.column)}
            >Remove</button>
          </div>
        ))
      )}
    </section>
  )
}

export default ActiveFilters