import React, { useState, useMemo, useCallback } from 'react';
import DataTable from 'react-data-table-component';

const Table = ({ columns, data, title, children, filter }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Memoized filtered data based on search term and dynamic columns
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    const lowerSearchTerm = searchTerm.toLowerCase();

    return data.filter(item =>
      columns.some(col => {
        const value = typeof col.selector === "function" ? col.selector(item) : null;
        return value && value.toString().toLowerCase().includes(lowerSearchTerm);
      })
    );
  }, [data, searchTerm, columns]);

  // Handler for search input
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Conditional rendering of the search bar and children
  const subHeaderComponentMemo = useMemo(() => {
    if (!filter && !children) return null;

    return (
      <div className="w-full flex items-center justify-between gap-2">
        {filter && (
          <input
            type="text"
            placeholder="Search..."
            className="w-full sm:w-1/3 p-2 border border-appColor rounded focus:outline-none focus:ring-2 focus:ring-appColor"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        )}
        <div className='w-fit'>{children}</div>
      </div>
    );
  }, [filter, searchTerm, children, handleSearchChange]);

  return (
    <DataTable
      responsive
      title={<p className="text-appColor  text-2xl uppercase font-bold">{title}</p>}
      columns={columns}
      data={filteredData}
      pagination
      striped
      highlightOnHover
      subHeader={!!subHeaderComponentMemo}
      subHeaderComponent={subHeaderComponentMemo}
      customStyles={{
        header: {
          style: {
            color: 'white',
            margin:  '0 auto',
            padding: '0 auto',
          },
        },
        rows: {
          style: {
            fontSize: '16px',
          },
        },
        subHeader: {
          style: {
            padding: '0px',
            margin:  '0px',
            display:  'flex',
            justifyContent: 'center',
            alignItems:  'center',
          },
        },
        headCells: {
          style: {
            backgroundColor: '#8f1e63',
            color: 'white',
            fontWeight: 'bold',
          },
        },
        cells: {
          style: {
            paddingLeft: '8px',
            paddingRight: '8px',
          },
        },
      }}
      
    />
  );
};

export default Table;
