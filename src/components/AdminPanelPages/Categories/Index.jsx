import React from 'react'
import ReactTable from '../../Table/index'
import { useState } from 'react';
import { Checkbox } from '@mui/material';
import { LocationConfigurationDialog } from '../../admin-console/AddCategorydialog';
import { Link } from 'react-router-dom';

import SecondaryButton from '../../inputs/secondaryButton';
import { DeleteBox } from '../../layout/dialogBox/delete';


const Index = () => {
  const [selectedRowID, setSelectedRowID] = useState(null);






  const getStatusCellStyle = (value) => {
    if (value === true) {
      return {
        background: '#ECFDF3',
        color: '#037847'
      };
    } else if (value === false) {
      return {
        background: '#f5d0d0',
        color: '#f03c24',
      };
    }
  };

  const StatusCell = ({ value }) => (
    <div className=' flex justify-center gap-1  items-center w-[60px] h-[22px] rounded-3xl' style={getStatusCellStyle(value)}>
      <span className='' style={getStatusCellStyle(value)}>{value ? 'On' : 'Off'}</span>
    </div>
  );

  const columns = React.useMemo(
    () => [
      {
        id: "selection",
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <Checkbox
            color="warning"
            {...getToggleAllRowsSelectedProps()}
          />
        ),
        width: 60,
        sortable: false,
        Cell: ({ row }) => (
          <Checkbox
            color="warning"
            {...row.getToggleRowSelectedProps()}
          />
        ),
        search: false
      },
      {
        Header: "Id", // Row number header
        accessor: "id", // Accessor for row number
        Cell: ({ row }) => (
          <div>{row.index + 1}</div>
        ),
        minWidth: 50,
        width: 50,
        search: false
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Status',
        accessor: 'is_active',
        Cell: StatusCell,
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        nofilter: true,
        minWidth: 100,
        width: 100,
        Cell: ({ row }) => (
          <div className='flex items-center justify-center pl-6 gap-3 max-desktop:pl-0 max-tablet:pl-0 max-tablet:gap-0 !max-desktop:gap-0'>
            <Link to="Edit" state={{ id: row?.id }} ><SecondaryButton sx={{ height: '30px' }}>Edit</SecondaryButton></Link>


            <DeleteBox
              url={`/admin-dashboard/category`}
              data={row?.original?.id}
              title={"Category"}
              // onClick={() => setSelectedRowID(row?.original?.id)}
              // onSuccess={() => setSelectedRowID(null)}
              // onClose={() => setSelectedRowID(null)}

              refetchUrl={'/admin-dashboard/category'}
            >

            </DeleteBox>

          </div>
        )
      }
    ],
    []
  );

  return (
    <div>
      <ReactTable
        // rows={tableData}
        rows={[]}
        columns={columns}
        manualPagination
        title={"Categories"}
        url="/admin-dashboard/category"
        // extraQuery={{ inactive: true }}
        addButton={<LocationConfigurationDialog />}
        selectedRowID={selectedRowID}
        checkboxSelection={true}
      />
    </div>
  )
}

export default Index;
