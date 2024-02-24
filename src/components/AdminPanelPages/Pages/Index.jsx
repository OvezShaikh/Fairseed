import React from 'react'
import ReactTable from '../../Table/index'
import { useState } from 'react';
import { Button, Checkbox } from '@mui/material';
import IndeterminateCheckbox from '../../Table/IndeterminateCheckbox';
import { LocationConfigurationDialog } from '../../admin-console/LocationConfigurationDialog';
import Columnfilter from '../../Table/Columnfilter'
import SecondaryButton from '../../inputs/secondaryButton';
import CauseEdit from '../CauseEditApprovel/Index';
import { GoDotFill } from "react-icons/go";
import { Link } from 'react-router-dom';

const Page = () => {
  const [selectedRowID, setSelectedRowID] = useState(null);


  const getStatusCellStyle = (status) => {
    console.log('Status:', status);
    if (status === 'Pending') {
      return {
        background: '#EBF0ED',
        color: '#717171'
      };
    } else if (status === 'Active') {
      return {
        background: '#ECFDF3  ',

        color: '#037847',
      };
    }
    return {
      color: 'gray'
    };
  };
  // const Status = ({ values }) => {
  //   // Loop through the array and create a badge-like component instead of a comma-separated string
  //   return (
  //     <>
  //       {values.map((Status, idx) => {
  //         return (
  //           <span key={idx} className="badge">
  //             {Status}
  //           </span>
  //         );
  //       })}
  //     </>
  //   );
  // };

  const StatusCell = ({ value }) => (
    <div className=' flex justify-center gap-1  items-center w-[100px] h-[25px] rounded-3xl' style={getStatusCellStyle(value)}>
      <span className='' style={getStatusCellStyle(value)}><GoDotFill /></span>
      <span className='' style={getStatusCellStyle(value)}>{value}</span>
    </div>
  );
  const columns = React.useMemo(
    () => [
      {
        Header: "Id", // Row number header
        accessor: "index", // Accessor for row number
        Cell: ({ row }) => (
          // Display row number using index provided by React Table
          <div>{row.index + 1}</div>
        ),
        minWidth: 50,
        width: 50,
        search: false
      },
      {
        Header: "Title",
        accessor: "title",
        apiURL: `/admin-dashboard/campaign`,
        sortable: false,
        minWidth: 100,
        width: 100,

      },
      {
        Header: 'Actions',
        accessor: 'actions',
        sortable: false,
        nofilter: true,
        minWidth: 100,
        width: 100,
        Cell: ({ row }) => {
          return (
            <div className='flex'>
              <Link to={'/Edit'} target={<CauseEdit id={row?.id} />}><SecondaryButton >Edit</SecondaryButton></Link>
              <SecondaryButton>Finalize your Campaign</SecondaryButton>
              <SecondaryButton>Edit Bank and KYC</SecondaryButton>
            </div>
          )
        }
      }
    ],

  );
  return (
    <div>
      <ReactTable
        rows={[]}
        columns={columns}
        showFilter
        manualPagination
        title={"Campaign"}
        checkboxComponent={IndeterminateCheckbox}
        url={`/admin-dashboard/campaign`}
        extraQuery={{ inactive: true }}
        addButton={<LocationConfigurationDialog />}
        // addButton={<Button>HElloooooo</Button>}
        selectedRowID={selectedRowID}
      />
    </div>
  )
}

export default Page

