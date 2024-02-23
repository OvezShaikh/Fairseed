import React from 'react'
import ReactTable from '../../Table/index'
import { useState } from 'react';
import { Button, Checkbox } from '@mui/material';
import IndeterminateCheckbox from '../../Table/IndeterminateCheckbox';
import { LocationConfigurationDialog } from '../../admin-console/LocationConfigurationDialog';
import Columnfilter from '../../Table/Columnfilter'
import SecondaryButton from '../../inputs/secondaryButton';
import CauseEdit from '../CauseEditApprovel/Index';
import { Link } from 'react-router-dom';

const Scholarship = () => {
  const [selectedRowID, setSelectedRowID] = useState(null);

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        apiURL: `/admin-dashboard/campaign`,
        filter: 'text',
        minWidth: 100,
        width: 100,

      },
      {
        Header: "Name",
        accessor: "title",
        apiURL: `/admin-dashboard/campaign`,
        minWidth: 100,
        width: 100,


      },
      {
        Header: "User",
        accessor: "user.username",
        apiURL: `/admin-dashboard/campaign`,
        minWidth: 100,
        width: 100,

      },
      {
        Header: "Email",
        accessor: "user.email",
        apiURL: `/admin-dashboard/campaign`,
        minWidth: 100,
        width: 100,

      },
      {
        Header: "Mobile",
        accessor: "user.mobile_number",
        apiURL: `/admin-dashboard/campaign`,
        minWidth: 100,
        width: 100,

      },
      {
        Header: "Goal",
        accessor: "goal_amount",
        apiURL: `/admin-dashboard/campaign`,
        minWidth: 100,
        width: 100,

      },
      {
        Header: "Status",
        accessor: "status",
        apiURL: `/admin-dashboard/campaign`,
        minWidth: 100,
        width: 100,
      },
      {
        Header: "Date",
        accessor: "end_date",
        apiURL: `/admin-dashboard/campaign`,
        minWidth: 100,
        width: 100,
      },
      {
        Header: 'Actions',
        accessor: 'actions',
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

export default Scholarship
