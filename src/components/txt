import React from 'react';
import Filter from './Filter';
import DataTable from 'react-data-table-component';

const Table = ({ label, data, filter, children, title, showFilter }) => {
  const [filterText, setFilterText] = React.useState('');
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

  const filteredItems = Array.isArray(data)
    ? data.filter(item => {
      if (typeof item[filter] !== 'string') {
        return false;
      }

      const filterTextLower = filterText.toLowerCase();
      const itemValueLower = item[filter].toLowerCase();
      return itemValueLower.includes(filterTextLower);
    })
    : [];

  // Conditionally display subHeaderComponent
  const subHeaderComponentMemo = React.useMemo(() => {
    // Check if the filter should be shown or if there are children
    if (!showFilter && (!children || children.length === 0)) {
      return null;
    }

    return (
      <div className='w-full flex items-center justify-between'>
        {showFilter
          ? <Filter onFilter={e => setFilterText(e.target.value)} filter={filter} filterText={filterText} />
          : <div></div>
        }
        <div className='items-end'>
          {children}
        </div>
      </div>
    );
  }, [filterText, resetPaginationToggle, children, showFilter]);

  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(array[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach(item => {
      let ctr = 0;
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter;
        result += item[key];
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  function downloadCSV(array) {
    if (!array.length) {
      alert('No data to export');
      return;
    }

    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = `${title}.csv`;

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }

  const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);

  function deleteSelected(array) {
    array.forEach(item => {
      console.log(item);
    });
  }

  const selectedComponentMemo = React.useMemo(() => (
    <div className='flex gap-2'>
      <button
        className='border-2 border-green-500 text-green-500 font-bold uppercase hover:bg-green-300 rounded-md px-2'
        onClick={() => downloadCSV(selectedRows)}
      >
        Export
      </button>
      <button
        className='border-2 border-red-500 text-red-500 font-bold uppercase hover:bg-red-300 rounded-md px-2'
        onClick={() => deleteSelected(selectedRows)}
      >
        Delete
      </button>
    </div>
  ), [selectedRows]);

  const customStyles = {
    rows: {
      style: {
        minHeight: '30px', // Reduce the row height
        padding: '2px 1px', // Reduce padding around the row content
      },
    },
    headCells: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        paddingTop: '8px',
        paddingBottom: '8px',
      },
    },
  };

  return (
    <DataTable
      responsive
      title={title ? <p className='uppercase text-3xl font-bold'>{title}</p> : null}
      columns={label}
      data={filteredItems}
      pagination
      striped
      subHeader={!!subHeaderComponentMemo}
      subHeaderComponent={subHeaderComponentMemo}
      resetPaginationToggle={resetPaginationToggle}
      selectableRows
      contextActions={selectedComponentMemo}
      onSelectedRowsChange={handleRowSelected}
      customStyles={customStyles}
    />
  );
};

export default Table;