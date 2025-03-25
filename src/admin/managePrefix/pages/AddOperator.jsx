import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import { DataGrid, GridFooterContainer } from '@mui/x-data-grid';
import React, { useState } from 'react'
import CustomNoRowsOverlay from '../../../whatsapp/components/CustomNoRowsOverlay';
import styled from 'styled-components';
import usePagination from '@mui/material/usePagination/usePagination';
import CustomTooltip from '../../../whatsapp/components/CustomTooltip';
import { MdOutlineDeleteForever } from "react-icons/md";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DropdownWithSearch from '../../../whatsapp/components/DropdownWithSearch';
import UniversalButton from '../../../whatsapp/components/UniversalButton';
import { Dialog } from 'primereact/dialog';
import InputField from '../../../whatsapp/components/InputField';

const PaginationList = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    gap: "8px",
});
const CustomPagination = ({
    totalPages,
    paginationModel,
    setPaginationModel,
}) => {
    const { items } = usePagination({
        count: totalPages,
        page: paginationModel.page + 1,
        onChange: (_, newPage) =>
            setPaginationModel({ ...paginationModel, page: newPage - 1 }),
    });

    return (
        <Box sx={{ display: "flex", justifyContent: "center", padding: 0 }}>
            <PaginationList>
                {items.map(({ page, type, selected, ...item }, index) => {
                    let children = null;

                    if (type === "start-ellipsis" || type === "end-ellipsis") {
                        children = "…";
                    } else if (type === "page") {
                        children = (
                            <Button
                                key={index}
                                variant={selected ? "contained" : "outlined"}
                                size="small"
                                sx={{ minWidth: "27px" }}
                                {...item}
                            >
                                {page}
                            </Button>
                        );
                    } else {
                        children = (
                            <Button
                                key={index}
                                variant="outlined"
                                size="small"
                                {...item}
                                sx={{}}
                            >
                                {type === "previous" ? "Previous" : "Next"}
                            </Button>
                        );
                    }

                    return <li key={index}>{children}</li>;
                })}
            </PaginationList>
        </Box>
    );
};
const AddOperator = ({ id, name }) => {
 const [selectedRows, setSelectedRows] = useState([]);
 const [newoperator, setNewOperator] = useState(false);
         const [paginationModel, setPaginationModel] = useState({
             page: 0,
             pageSize: 10,
         });

const countryOptions = [
    { label: 'India', value: 'India' },
    { label: 'USA', value: 'USA' },
    { label: 'UK', value: 'UK' },
    { label: 'Australia', value: 'Australia' },
]
const AddnewcountryOptions = [
    { label: 'India', value: 'India' },
    { label: 'USA', value: 'USA' },
    { label: 'UK', value: 'UK' },
    { label: 'Australia', value: 'Australia' },
]

     const rows = Array.from({ length: 20 }, (_, i) => ({
         id: i + 1,
         sn: i + 1,
         country: "India",
         operator: "Ashima",
     }));
 
     const columns = [
         { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
         { field: "country", headerName: "Country", flex: 1, minWidth: 80 },
         { field: "operator", headerName: "Operator", flex: 1, minWidth: 120 },
         {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            minWidth: 100,
            renderCell: (params) => (
                <>
                    <CustomTooltip
                        title="Edit Operator"
                        placement="top"
                        arrow
                    >
                        <IconButton onClick={() => handleEdit(params.row)}>
                            <EditNoteIcon
                                sx={{
                                    fontSize: '1.2rem',
                                    color: 'gray',
                                }} />
                        </IconButton>
                    </CustomTooltip>
                    <CustomTooltip
                        title="Delete Operator"
                        placement="top"
                        arrow
                    >
                        <IconButton className='no-xs' onClick={() => handleDelete(params.row)}>
                            <MdOutlineDeleteForever
                                className="text-red-500 cursor-pointer hover:text-red-600"
                                size={20}
                            />
                        </IconButton>
                    </CustomTooltip>
                </>
            ),
        },
     ];
 
     const totalPages = Math.ceil(rows.length / paginationModel.pageSize);
 
     const CustomFooter = () => {
 
         return (
             <GridFooterContainer
                 sx={{
                     display: "flex",
                     flexWrap: "wrap",
                     justifyContent: { xs: "center", lg: "space-between" },
                     alignItems: "center",
                     padding: 1,
                     gap: 2,
                     overflowX: "auto",
                 }}
             >
                 <Box
 
                     sx={{
                         display: "flex",
                         alignItems: "center",
                         flexWrap: "wrap",
                         gap: 1.5,
                     }}
                 >
                     {selectedRows.length > 0 && (
                         <Typography
                             variant="body2"
                             sx={{ borderRight: "1px solid #ccc", paddingRight: "10px" }}
                         >
                             {selectedRows.length} Rows Selected
                         </Typography>
                     )}
 
                     <Typography variant="body2">
                         Total Records: <span className="font-semibold">{rows.length}</span>
                     </Typography>
                 </Box>
 
                 <Box
                     sx={{
                         display: "flex",
                         justifyContent: "center",
                         width: { xs: "100%", sm: "auto" },
                     }}
                 >
                     <CustomPagination
                         totalPages={totalPages}
                         paginationModel={paginationModel}
                         setPaginationModel={setPaginationModel}
                     />
                 </Box>
             </GridFooterContainer>
         );
     };
   return (
     <div>
         <div className="flex flex-wrap gap-2 items-end justify-between pb-3 w-full">
        <div className='flex flex-wrap gap-2 items-end'>
          <div className="w-56">
            <DropdownWithSearch
              label="Country"
              id="country"
              name="country"
              options={countryOptions}
              placeholder='select country'
            />
          </div>
          <div className="w-max-content">
            <UniversalButton
              label="Search"
              id="searchaddoperator"
              name="searchaddoperator"
              // onClick={handleSearchAddOperator}
            />
          </div>
        </div>
        <div className='flex gap-2'>
          <div className="w-max-content">
            <UniversalButton
              label="Add New"
              id="addnewoperator"
              name="addnewoperator"
              onClick={() => setNewOperator(true)}
            />

          </div>
          <div className="w-max-content">
            <UniversalButton
              label="Import"
              id="importoperator"
              name="importoperator"
            />

          </div>
        </div>
      </div>
       <Paper sx={{ height: 558 }} id={id} name={name}>
                 <DataGrid
                     id={id}
                     name={name}
                     rows={rows}
                     columns={columns}
                     initialState={{ pagination: { paginationModel } }}
                     pageSizeOptions={[10, 20, 50]}
                     pagination
                     paginationModel={paginationModel}
                     onPaginationModelChange={setPaginationModel}
                     rowHeight={45}
                     slots={{
                         footer: CustomFooter,
                         noRowsOverlay: CustomNoRowsOverlay,
                     }}
                     onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
                     checkboxSelection
                     disableRowSelectionOnClick
                     disableColumnResize
                     disableColumnMenu
                     sx={{
                         border: 0,
                         "& .MuiDataGrid-cell": { outline: "none !important" },
                         "& .MuiDataGrid-columnHeaders": {
                             color: "#193cb8",
                             fontSize: "14px",
                             fontWeight: "bold !important",
                         },
                         "& .MuiDataGrid-row--borderBottom": {
                             backgroundColor: "#e6f4ff !important",
                         },
                         "& .MuiDataGrid-columnSeparator": { color: "#ccc" },
                     }}
                 />
             </Paper>

             <Dialog
        header="Add New Operator"
        visible={newoperator}
        onHide={() => setNewOperator(false)}
        className="lg:w-[30rem] md:w-[25rem] w-[20rem]"
        draggable={false}
      >
        <div className='space-y-4'>
        <DropdownWithSearch
              label="Country"
              id="countryaddnew"
              name="countryaddnew"
              options={AddnewcountryOptions}
              placeholder='select country'
            />
          <InputField
            label="Operator Name*"
            id="addnewoperatorname"
            name="addnewoperatorname"
            placeholder='Enter Operator Name'
          />
          <div className='flex justify-center'>
            <UniversalButton
              label="Save"
              id="saveaddprefix"
              name="saveaddprefix"
            />
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default AddOperator
