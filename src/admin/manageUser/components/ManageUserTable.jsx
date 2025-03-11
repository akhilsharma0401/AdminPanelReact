import * as React from 'react';
import { useState } from 'react';
import { IconButton, Paper, Typography, Box, Button, Tooltip, Popover, } from '@mui/material';
import { DataGrid, GridFooterContainer } from '@mui/x-data-grid';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';
import { Dialog } from "primereact/dialog";
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from "primereact/checkbox";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import { BsJournalArrowDown } from 'react-icons/bs';
import CustomNoRowsOverlay from '../../../whatsapp/components/CustomNoRowsOverlay';
import CustomTooltip from '../../../whatsapp/components/CustomTooltip';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import EmergencyOutlinedIcon from '@mui/icons-material/EmergencyOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import EditNoteIcon from "@mui/icons-material/EditNote";
import RadioGroupField from '../../../whatsapp/components/RadioGroupField';
import AnimatedDropdown from '../../../whatsapp/components/AnimatedDropdown';
import InputField from '../../../whatsapp/components/InputField';
import UniversalButton from '../../../whatsapp/components/UniversalButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import UniversalDatePicker from '../../../whatsapp/components/UniversalDatePicker';
import UniversalLabel from '../../../whatsapp/components/UniversalLabel';



function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const PaginationList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  gap: "8px",
});

const CustomPagination = ({ totalPages, paginationModel, setPaginationModel }) => {
  const { items } = usePagination({
    count: totalPages,
    page: paginationModel.page + 1,
    onChange: (_, newPage) => setPaginationModel({ ...paginationModel, page: newPage - 1 }),
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
              <Button key={index} variant="outlined" size="small" {...item} sx={{}} >
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

const ContentCell = ({ value }) => {
  const [anchorEl, setAnchorEl] = useState(null);  // ✅ Start as null
  const [open, setOpen] = useState(false);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);  // ✅ Close popover immediately
    setOpen(false);
  };

  // const open = Boolean(anchorEl);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div


      style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <span style={{ flexGrow: 1, fontSize: "14px", fontWeight: "500" }}>
        {value}
      </span>

      {/* <IconButton
                size="small"
                onClick={copyToClipboard}
                sx={{ color: "#007BFF", "&:hover": { color: "#0056b3" } }}
            >
                <ContentCopyIcon fontSize="small" />
            </IconButton> */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        onMouseLeave={handlePopoverClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        disableRestoreFocus
        PaperProps={{
          sx: {
            p: 1,
            maxWidth: 300,
            borderRadius: 2,
            boxShadow: 3,
          },
          onMouseEnter: () => setOpen(true), // ✅ Keep open when inside popover
          onMouseLeave: handlePopoverClose, // ✅ Close when moving outside popover
        }}

      >
        {/* <Paper sx={{ p: 1, maxWidth: 300, borderRadius: 2, boxShadow: 3 }}> */}
        <Typography sx={{ fontSize: "14px", color: "#333", mb: 1 }}>
          {value}
        </Typography>

        <Button
          variant="outlined"
          size="small"
          onClick={copyToClipboard}
          startIcon={<ContentCopyIcon />}
          sx={{
            width: "100%",
            textTransform: "none",
            fontSize: "13px",
            color: "#007BFF",
            borderColor: "#007BFF",
            "&:hover": { backgroundColor: "#007BFF", color: "#fff" },
          }}
        >
          Copy
        </Button>
        {/* </Paper> */}
      </Popover>

    </div>
  );
};


const ManageUserTable = ({ id, name }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [logins, setLogins] = useState(false);
  const [otpService, setOtpService] = useState(false);
  const [viewService, setViewService] = useState(false);
  const [editService, setEditService] = useState(false);
  const [assignService, setAssignService] = useState(false);
  const [manageApiKeys, setManageApiKeys] = useState(false);
  const [reset, setreset] = useState(false);
  const [userReports, setuserReports] = useState("");
  const [value, setValue] = useState(0);

  // assignService
  // whatsapp
  const [whatsappStatus, setWhatsappStatus] = useState("disable");
  const [whatsappCountry, setWhatsappCountry] = useState(null);
  const [whatsappUtility, setWhatsappUtility] = useState("");
  const [whatsappMarketing, setWhatsappMarketing] = useState("");


  const countryOptions = [
    { value: "USA", label: "USA" },
    { value: "UK", label: "UK" },
    { value: "India", label: "India" },
  ]

  const handleWhatsappAddCredit = () => {
    console.log("hello world")
  }

  const handleChangewhatsapp = (event) => {
    setWhatsappStatus(event.target.value);
    // setRcsStatus(value);
    // onOptionChange(value);
  }

  // whatsapp
  // RCS
  const [rcsStatus, setRcsStatus] = useState("disable");
  const [rcsCountry, setRcsCountry] = useState(null);
  const [rcsrate, setRcsrate] = useState("");

  const rcscountryOptions = [
    { value: "USA", label: "USA" },
    { value: "UK", label: "UK" },
    { value: "India", label: "India" },
  ]

  const handleRcsAddCredit = () => {
    console.log("hello world")
  }

  const handleChangercs = (event) => {
    setRcsStatus(event.target.value);
    // setRcsStatus(value);
    // onOptionChange(value);
  }
  // RCS
  // SMS
  const [smsStatus, setSmsStatus] = useState("disable");
  const [transcheck, setTranscheck] = useState(false);
  const [promocheck, setPromocheck] = useState(false);
  const [trans, setTrans] = useState(null);
  const [promo, setPromo] = useState(null);
  const [smsrate, setSmsRate] = useState("");


  const transOptions = [
    { value: "USA", label: "USA" },
    { value: "UK", label: "UK" },
    { value: "India", label: "India" },
  ];
  const promoOption = [
    { value: "USA", label: "USA" },
    { value: "UK", label: "UK" },
    { value: "India", label: "India" },
  ];

  const handleChangesms = (event) => {
    setSmsStatus(event.target.value);
    // setRcsStatus(value);
    // onOptionChange(value);
  }
  // SMS
  // OBD
  const [obdStatus, setObdStatus] = useState("disable");
  const [transcheckobd, setTranscheckobd] = useState(false);
  const [promocheckobd, setPromocheckobd] = useState(false);
  const [transobd, setTransobd] = useState(null);
  const [promoobd, setPromoobd] = useState(null);
  const [obdrate, setObdRate] = useState("");
  const [obdrateStatus, setObdRateStatus] = useState("disable");


  const transOptionsobd = [
    { value: "USA", label: "USA" },
    { value: "UK", label: "UK" },
    { value: "India", label: "India" },
  ];
  const promoOptionobd = [
    { value: "USA", label: "USA" },
    { value: "UK", label: "UK" },
    { value: "India", label: "India" },
  ];

  const handleChangeobd = (event) => {
    setObdStatus(event.target.value);
    // setRcsStatus(value);
    // onOptionChange(value);
  }
  const handleChangeobdRate = (event) => {
    setObdRateStatus(event.target.value);
    // setRcsStatus(value);
    // onOptionChange(value);
  }
  // OBD
  // Function to validate input
  const validateInput = (value, setter) => {
    value = value.replace(/[^0-9.]/g, "");
    const parts = value.split(".");

    if (parts.length > 2) {
      value = parts[0] + "." + parts.slice(1).join("");
    }

    if (parts[0].length > 1 && !value.includes(".")) {
      value = parts[0][0] + "." + parts[0].slice(1);
    }

    if (parts[1] && parts[1].length > 2) {
      value = parts[0] + "." + parts[1].substring(0, 2);
    }

    let floatVal = parseFloat(value);
    if (floatVal > 9.99) {
      value = "9.99"; // Max limit
    }

    if (value && floatVal < 0.01) {
      value = ""; // Prevent values less than 0.01
    }

    setter(value);
  };
  // assignService

  // Edit
  const [userid, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [userType, setUserType] = useState(null);
  const [expiryDate, setExpiryDate] = useState("");
  const [editstatusStatus, setEditStatusStatus] = useState("disable");

  const useroption = [
    { value: "User", label: "User" },
    { value: "Reseller", label: "Reseller" },
  ];


  const handleChangeEditStatus = (event) => {
    setEditStatusStatus(event.target.value);
    // setRcsStatus(value);
    // onOptionChange(value);
  }
  // Edit

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLonins = (id, name) => {
    setLogins(true);
  };
  const handleOtp = (id, name) => {
    setOtpService(true);
  };
  const handleView = (id, name) => {
    setViewService(true);
  };
  const handleEdit = (id, name) => {
    setEditService(true);
  };
  const handleAssign = (id, name) => {
    setAssignService(true);
  };
  const handleApikey = (id, name) => {
    setManageApiKeys(true);
  };
  const handleReset = (id, name) => {
    setreset(true);
  };
  const handleReport = (id, name) => {
    setuserReports(true);
  };

  const columns = [
    { field: 'sn', headerName: 'S.No', flex: 0, minWidth: 80 },
    { field: 'userid', headerName: 'User ID', flex: 1, minWidth: 120 },
    { field: 'firstname', headerName: 'First Name', flex: 1, minWidth: 120 },
    { field: 'lastname', headerName: 'Last Name', flex: 1, minWidth: 120 },
    { field: 'company', headerName: 'Company', flex: 1, minWidth: 120 },
    { field: 'status', headerName: 'Status', flex: 1, minWidth: 120 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 350,
      renderCell: (params) => (
        <>
          <CustomTooltip arrow title="Login" placement="top">
            <IconButton onClick={() => handleLonins(params.row)}>
              <LockOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="Otp" placement="top">
            <IconButton onClick={() => handleOtp(params.row)}>
              <EmergencyOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="View User Details" placement="top">
            <IconButton onClick={() => handleView(params.row)}>
              <RemoveRedEyeOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="Edit User Details" placement="top">
            <IconButton onClick={() => handleEdit(params.row)}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="Assign Service" placement="top">
            <IconButton onClick={() => handleAssign(params.row)}>
              <SettingsOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="Manage Api Key" placement="top">
            <IconButton onClick={() => handleApikey(params.row)}>
              <KeyOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="Reset Password" placement="top">
            <IconButton onClick={() => handleReset(params.row)}>
              <LockOpenOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="User Reports" placement="top">
            <IconButton onClick={() => handleReport(params.row)}>
              <AssignmentOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
        </>
      ),
    },
  ];

  const whatsaappcolumns = [
    { field: 'sn', headerName: 'S.No', flex: 0, minWidth: 80 },
    { field: 'country', headerName: 'Country', flex: 1, minWidth: 120 },
    { field: 'utility', headerName: 'Utility (INR/Credit)', flex: 1, minWidth: 120 },
    { field: 'marketing', headerName: 'Marketing (INR/Credit)', flex: 1, minWidth: 120 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <>
          <CustomTooltip arrow title="Edit" placement="top">
            <IconButton onClick={() => handleWhatsappEdit(params.row)}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="Delete" placement="top">
            <IconButton onClick={() => handleWhatsappDelete(params.row)}>
              <DeleteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>

        </>
      ),
    },
  ];

  const rcscolumns = [
    { field: 'sn', headerName: 'S.No', flex: 0, minWidth: 80 },
    { field: 'country', headerName: 'Country', flex: 1, minWidth: 120 },
    { field: 'rate', headerName: 'Rate (INR/Credit)', flex: 1, minWidth: 120 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <>
          <CustomTooltip arrow title="Edit" placement="top">
            <IconButton onClick={() => handleRcsEdit(params.row)}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip arrow title="Delete" placement="top">
            <IconButton onClick={() => handleRcsDelete(params.row)}>
              <DeleteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>

        </>
      ),
    },
  ];

  const rows = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    sn: i + 1,
    userid: 'xyz',
    firstname: 'Demo',
    lastname: 'demopro',
    company: 'Dummy Company',
    status: 'pending..',
  }));

  const whatsapprows = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    sn: i + 1,
    country: 'India',
    utility: '0.30',
    marketing: '0.80',
  }));

  const rcsrows = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    sn: i + 1,
    country: 'India',
    rate: '0.30',
  }));

  const totalPages = Math.ceil(rows.length / paginationModel.pageSize);

  const CustomFooter = () => {
    return (
      <GridFooterContainer sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: { xs: "center", lg: "space-between" },
        alignItems: "center",
        padding: 1,
        gap: 2,
        overflowX: "auto",
      }}>
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1.5 }}>
          {selectedRows.length > 0 && (
            <Typography variant="body2" sx={{ borderRight: "1px solid #ccc", paddingRight: "10px" }}>
              {selectedRows.length} Rows Selected
            </Typography>
          )}

          <Typography variant="body2">
            Total Records: <span className='font-semibold'>{rows.length}</span>
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", width: { xs: "100%", sm: "auto" } }}>
          <CustomPagination totalPages={totalPages} paginationModel={paginationModel} setPaginationModel={setPaginationModel} />
        </Box>
      </GridFooterContainer>
    );
  };

  return (
    <>
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
          disableRowSelectionOnClick
          disableColumnResize
          disableColumnMenu
          sx={{
            border: 0,
            "& .MuiDataGrid-cell": { outline: "none !important" },
            "& .MuiDataGrid-columnHeaders": { color: "#193cb8", fontSize: "14px", fontWeight: "bold !important" },
            "& .MuiDataGrid-row--borderBottom": { backgroundColor: "#e6f4ff !important" },
            "& .MuiDataGrid-columnSeparator": { color: "#ccc" },
          }}
        />
      </Paper>


      {/* Login details */}
      <Dialog
        header="Login details"
        visible={logins}
        onHide={() => setLogins(false)}
        className="w-[30rem]"
        draggable={false}
      >
        Login details
      </Dialog>
      {/* Login details */}

      {/* OTP details */}
      <Dialog
        header="OTP details"
        visible={otpService}
        onHide={() => setOtpService(false)}
        className="w-[30rem]"
        draggable={false}
      >
        OTP details
      </Dialog>
      {/* OTP details */}

      {/* View details */}
      <Dialog
        header="View details"
        visible={viewService}
        onHide={() => setViewService(false)}
        className="w-[30rem]"
        draggable={false}
      >
        View details
      </Dialog>
      {/* View details */}

      {/* Edit details */}
      <Dialog
        header="Edit details"
        visible={editService}
        onHide={() => setEditService(false)}
        className="lg:w-[50rem] md:w-[40rem] w-[20rem]"
        draggable={false}
      >
        <div className='space-y-3'>
          <div className="grid lg:grid-cols-2 gap-4 mb-2">
            <InputField label="User ID"
              id="userid"
              name="userid"
              placeholder="Enter your User ID"
              required
              value={userid}
              onChange={(e) => setUserId(e.target.value)}
            />
            <UniversalDatePicker
              label="Expiry Date"
              id="expiryDate"
              name="expiryDate"
              placeholder="Enter Expiry Date"
              value={expiryDate}
              onChange={(newValue) => setExpiryDate(newValue)}
            />
          </div>
          <div className="flex gap-2 mb-2">
            <AnimatedDropdown
              label="User Type"
              id="userType"
              name="userType"
              options={useroption}
              value={userType}
              onChange={setUserType}
            />
            <InputField label="Account URL"
              id="accountNumber"
              name="accountNumber"
              placeholder="Enter Url"
            />
          </div>

          <div className="lg:w-100 md:w-100 flex flex-wrap gap-4 mt-4">
            <div className="flex justify-center items-center" >
              <UniversalLabel
                text="Status"
                id="editstatus"
                name="editstatus"
                className='text-gray-700 font-medium text-sm'
              />
            </div>
            {/* Option 1 */}
            <div className="flex items-center gap-2" >
              <RadioButton inputId="editstatusOption1" name="editstatusredio" value="enable" onChange={handleChangeEditStatus} checked={editstatusStatus === 'enable'} />
              <label htmlFor="editstatusOption1" className="text-gray-700 font-medium text-sm cursor-pointer">Enable</label>
            </div>
            {/* Option 2 */}
            <div className="flex items-center gap-2" >
              <RadioButton inputId="editstatusOption2" name="editstatusredio" value="disable" onChange={handleChangeEditStatus} checked={editstatusStatus === 'disable'} />
              <label htmlFor="editstatusOption2" className="text-gray-700 font-medium text-sm cursor-pointer">Disable</label>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
            <InputField label="First Name"
              id="firstname"
              name="firstname"
              placeholder="Enter your First Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <InputField label="Last Name"
              id="lastname"
              name="lastname"
              placeholder="Enter your Last Name"
              value={userLastName}
              onChange={(e) => setUserLastName(e.target.value)}
              required
            />
            <InputField label="Email ID" type="email"
              id="email"
              name="email"
              placeholder="Enter your Email ID"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
            <InputField label="Mobile No."
              id="mobile"
              name="mobile"
              placeholder="Enter your Mobile No."
              value={userPhoneNumber}
              onChange={(e) => setUserPhoneNumber(e.target.value)}
            />
            <InputField label="Company Name"
              id="company"
              name="company"
              placeholder="Enter your Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <InputField label="Address"
              id="address"
              name="address"
              placeholder="Enter your Address"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
            />
            <InputField label="City"
              id="city"
              name="city"
              placeholder="Enter your City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <InputField label="State"
              id="state"
              name="state"
              placeholder="Enter your State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
            <InputField label="Country"
              id="country"
              name="country"
              placeholder="Enter your Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <InputField label="Pincode"
              id='Pincode'
              name="Pincode"
              placeholder="Enter your Pincode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>

          <div className='flex justify-center mt-3'>
                    <UniversalButton
                      label="Save"
                      id="whatsappsave"
                      name="whatsappsave"
                    />
                  </div>
        </div>
      </Dialog>
      {/* Edit details */}

      {/* assignService */}
      <Dialog
        header="Assign Service"
        visible={assignService}
        onHide={() => setAssignService(false)}
        className="lg:w-[50rem] md:w-[40rem] w-[20rem]"
        draggable={false}
      >
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Assign Service Tabs"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab
              label={
                <span>
                  <WhatsAppIcon size={20} /> WhatsApp
                </span>
              }
              {...a11yProps(0)}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: '#f0f4ff',
                  borderRadius: '8px',
                },
              }}
            />
            <Tab
              label={
                <span className='flex gap-2 items-center' >
                  <BsJournalArrowDown size={18} />RCS
                </span>
              }
              {...a11yProps(1)}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: '#f0f4ff',
                  borderRadius: '8px',
                },
              }}
            />
            <Tab
              label={
                <span>
                  <SmsOutlinedIcon size={20} /> SMS
                </span>
              }
              {...a11yProps(2)}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: '#f0f4ff',
                  borderRadius: '8px',
                },
              }}
            />
            <Tab
              label={
                <span>
                  <CampaignOutlinedIcon size={20} />OBD
                </span>
              }
              {...a11yProps(2)}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: '#f0f4ff',
                  borderRadius: '8px',
                },
              }}
            />
          </Tabs>
          <CustomTabPanel value={value} index={0} className="">
            <div>
              <div className="lg:w-100 md:w-100 flex flex-wrap gap-2 mb-2">
                {/* Option 1 */}
                <div className="flex-1 cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-3 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2" >
                    <RadioButton inputId="whatsaapOption1" name="whatsappredio" value="enable" onChange={handleChangewhatsapp} checked={whatsappStatus === 'enable'} />
                    <label htmlFor="whatsaapOption1" className="text-gray-700 font-medium text-sm cursor-pointer">Enable</label>
                  </div>
                </div>
                {/* Option 2 */}
                <div className="flex-1  cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2.5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2" >
                    <RadioButton inputId="whatsOption2" name="whatsappredio" value="disable" onChange={handleChangewhatsapp} checked={whatsappStatus === 'disable'} />
                    <label htmlFor="whatsOption2" className="text-gray-700 font-medium text-sm cursor-pointer">Disable</label>
                  </div>
                </div>
              </div>
              {/* <RadioGroupField
                id="whatsappenabledisabled"
                name="whatsappenabledisabled"
                // label="Enable Whatsapp"
                options={whatsappenabledisabled}
                value={whatsappStatus}
                onChange={(e) => setWhatsappStatus(e.target.value)}
              /> */}
              {whatsappStatus === "enable" && (
                <>
                  <div id='whatsapptable'>
                    <div className='flex flex-wrap lg:flex-nowrap gap-4 items-end justify-start align-middle pb-5 w-full'>
                      <AnimatedDropdown
                        id="whatsappcountryselect"
                        name="whatsappcountryselect"
                        label="Select Country"
                        options={countryOptions}
                        value={whatsappCountry}
                        onChange={(value) => setWhatsappCountry(value)}
                      />

                      <InputField
                        id="whatsapputility"
                        name="whatsapputility"
                        label="Utility"
                        placeholder="INR / Credit"
                        value={whatsappUtility}
                        onChange={(e) => validateInput(e.target.value, setWhatsappUtility)}
                        type="text"
                        readOnly={!whatsappCountry}
                      />

                      <InputField
                        id="whatsappmarketing"
                        name="whatsappmarketing"
                        label="Marketing"
                        placeholder="INR / Credit"
                        value={whatsappMarketing}
                        onChange={(e) => validateInput(e.target.value, setWhatsappMarketing)}
                        type="text"
                        readOnly={!whatsappCountry}
                      />

                      <UniversalButton
                        label="Add"
                        id="whatsaapaddcredit"
                        name="whatsaapaddcredit"
                        onClick={handleWhatsappAddCredit}
                      />
                    </div>


                    <Paper sx={{ height: 250 }} id={id} name={name}>
                      <DataGrid
                        id={id}
                        name={name}
                        rows={whatsapprows}
                        columns={whatsaappcolumns}
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
                        disableRowSelectionOnClick
                        disableColumnResize
                        disableColumnMenu
                        sx={{
                          border: 0,
                          "& .MuiDataGrid-cell": { outline: "none !important" },
                          "& .MuiDataGrid-columnHeaders": { color: "#193cb8", fontSize: "14px", fontWeight: "bold !important" },
                          "& .MuiDataGrid-row--borderBottom": { backgroundColor: "#e6f4ff !important" },
                          "& .MuiDataGrid-columnSeparator": { color: "#ccc" },
                        }}
                      />
                    </Paper>
                  </div>
                  <div className='flex justify-center mt-3'>
                    <UniversalButton
                      label="Save"
                      id="whatsappsave"
                      name="whatsappsave"
                    />
                  </div>
                </>
              )}


            </div>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={1}>
            <div>
              <div className="lg:w-100 md:w-100 flex flex-wrap gap-2 mb-2">
                {/* Option 1 */}
                <div className="flex-1 cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-3 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2" >
                    <RadioButton inputId="rcsOption1" name="rcsredio" value="enable" onChange={handleChangercs} checked={rcsStatus === 'enable'} />
                    <label htmlFor="rcsOption1" className="text-gray-700 font-medium text-sm cursor-pointer">Enable</label>
                  </div>
                </div>
                {/* Option 2 */}
                <div className="flex-1  cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2.5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2" >
                    <RadioButton inputId="rcsOption2" name="rcsredio" value="disable" onChange={handleChangercs} checked={rcsStatus === 'disable'} />
                    <label htmlFor="rcsOption2" className="text-gray-700 font-medium text-sm cursor-pointer">Disable</label>
                  </div>
                </div>
              </div>

              {/* <RadioGroupField
                id="rcsenabledisabled"
                name="rcsenabledisabled"
                // label="Enable Whatsapp"
                options={rcsenabledisabled}
                value={rcsStatus}
                onChange={(e) => setRcsStatus(e.target.value)}
              /> */}
              {rcsStatus === "enable" && (
                <>
                  <div id='rcstable'>
                    <div className='flex flex-wrap lg:flex-nowrap gap-4 items-end justify-start align-middle pb-5 w-full'>
                      <AnimatedDropdown
                        id="rcscountryselect"
                        name="rcscountryselect"
                        label="Select Country"
                        options={rcscountryOptions}
                        value={rcsCountry}
                        onChange={(value) => setRcsCountry(value)}
                      />

                      <InputField
                        id="rcsrate"
                        name="rcsrate"
                        label="Rate"
                        placeholder="INR / Credit"
                        value={rcsrate}
                        onChange={(e) => validateInput(e.target.value, setRcsrate)}
                        type="text"
                        readOnly={!rcsCountry}
                      />

                      <UniversalButton
                        label="Add"
                        id="rcsaddcredit"
                        name="rcsaddcredit"
                        onClick={handleRcsAddCredit}
                      />
                    </div>


                    <Paper sx={{ height: 250 }} id={id} name={name}>
                      <DataGrid
                        id={id}
                        name={name}
                        rows={rcsrows}
                        columns={rcscolumns}
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
                        disableRowSelectionOnClick
                        disableColumnResize
                        disableColumnMenu
                        sx={{
                          border: 0,
                          "& .MuiDataGrid-cell": { outline: "none !important" },
                          "& .MuiDataGrid-columnHeaders": { color: "#193cb8", fontSize: "14px", fontWeight: "bold !important" },
                          "& .MuiDataGrid-row--borderBottom": { backgroundColor: "#e6f4ff !important" },
                          "& .MuiDataGrid-columnSeparator": { color: "#ccc" },
                        }}
                      />
                    </Paper>
                  </div>
                  <div className='flex justify-center mt-3'>
                    <UniversalButton
                      label="Save"
                      id="rcssave"
                      name="rcssave"
                    />
                  </div>
                </>
              )}
            </div>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={2}>
            <div>
              <div className="lg:w-100 md:w-100 flex flex-wrap gap-2 mb-2">
                {/* Option 1 */}
                <div className="flex-1 cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-3 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2" >
                    <RadioButton inputId="smsOption1" name="smsredio" value="enable" onChange={handleChangesms} checked={smsStatus === 'enable'} />
                    <label htmlFor="smsOption1" className="text-gray-700 font-medium text-sm cursor-pointer">Enable</label>
                  </div>
                </div>
                {/* Option 2 */}
                <div className="flex-1  cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2.5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2" >
                    <RadioButton inputId="smsOption2" name="smsredio" value="disable" onChange={handleChangesms} checked={smsStatus === 'disable'} />
                    <label htmlFor="smsOption2" className="text-gray-700 font-medium text-sm cursor-pointer">Disable</label>
                  </div>
                </div>
              </div>

              {smsStatus === "enable" && (

                <div>
                  <div className='flex lg:w-100 md:w-100 mb-2'>
                    <Checkbox
                      id="smsstatus"
                      name="smsstatus"
                      onChange={(e) => setTranscheck(e.checked)}
                      checked={transcheck}
                      className="m-2"
                    />

                    <AnimatedDropdown
                      id="transdropdown"
                      name="transdropdown"
                      options={transOptions}
                      value={trans}
                      onChange={(value) => setTrans(value)}
                      disabled={!transcheck}
                    />
                  </div>
                  <div className='flex lg:w-100 md:w-100'>
                    <Checkbox
                      id="smspromo"
                      name="smspromo"
                      onChange={(e) => setPromocheck(e.checked)}
                      checked={promocheck}
                      className="m-2"
                    />

                    <AnimatedDropdown
                      id="transdropdown"
                      name="transdropdown"
                      options={promoOption}
                      value={promo}
                      onChange={(value) => setPromo(value)}
                      disabled={!promocheck}
                    />
                  </div>

                  <div className=' lg:w-100 md:w-100'>
                    <InputField
                      id="translimit"
                      name="translimit"
                      label="Rate"
                      placeholder="(INR / Credit)"
                      value={smsrate}
                      onChange={(e) => validateInput(e.target.value, setSmsRate)}
                      type="number"
                    />
                  </div>
                  <div className='flex justify-center mt-3'>
                    <UniversalButton
                      label="Save"
                      id="whatsappsave"
                      name="whatsappsave"
                    />
                  </div>
                </div>

              )}
            </div>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={3}>
            <div>
              <div className="lg:w-100 md:w-100 flex flex-wrap gap-2 mb-2">
                {/* Option 1 */}
                <div className="flex-1 cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-3 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2" >
                    <RadioButton inputId="obdOption1" name="obdredio" value="enable" onChange={handleChangeobd} checked={obdStatus === 'enable'} />
                    <label htmlFor="obdOption1" className="text-gray-700 font-medium text-sm cursor-pointer">Enable</label>
                  </div>
                </div>
                {/* Option 2 */}
                <div className="flex-1  cursor-pointer bg-white border border-gray-300 rounded-lg px-2 py-2.5 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2" >
                    <RadioButton inputId="obdOption2" name="obdredio" value="disable" onChange={handleChangeobd} checked={obdStatus === 'disable'} />
                    <label htmlFor="obdOption2" className="text-gray-700 font-medium text-sm cursor-pointer">Disable</label>
                  </div>
                </div>
              </div>

              {obdStatus === "enable" && (

                <div>
                  <div className='flex lg:w-100 md:w-100 mb-2'>
                    <Checkbox
                      id="obdstatusobd"
                      name="obdstatusobd"
                      onChange={(e) => setTranscheckobd(e.checked)}
                      checked={transcheckobd}
                      className="m-2"
                    />

                    <AnimatedDropdown
                      id="transdropdownobd"
                      name="transdropdownobd"
                      options={transOptionsobd}
                      value={transobd}
                      onChange={(value) => setTransobd(value)}
                      disabled={!transcheckobd}
                    />
                  </div>
                  <div className='flex lg:w-100 md:w-100'>
                    <Checkbox
                      id="obdstatuspromo"
                      name="obdstatuspromo"
                      onChange={(e) => setPromocheckobd(e.checked)}
                      checked={promocheckobd}
                      className="m-2"
                    />

                    <AnimatedDropdown
                      id="transdropdownobd"
                      name="transdropdownobd"
                      options={promoOptionobd}
                      value={promoobd}
                      onChange={(value) => setPromoobd(value)}
                      disabled={!promocheckobd}
                    />
                  </div>

                  <div className=' lg:w-100 md:w-100'>
                    <div className="lg:w-100 md:w-100 flex flex-wrap gap-4 my-2 ">
                      {/* Option 1 */}
                      <div className="flex items-center gap-2" >
                        <RadioButton inputId="obdrateOption1" name="obdrateredio" value="enable" onChange={handleChangeobdRate} checked={obdrateStatus === 'enable'} />
                        <label htmlFor="obdrateOption1" className="text-gray-700 font-medium text-sm cursor-pointer">@ 15 sec</label>
                      </div>
                      {/* Option 2 */}
                      <div className="flex items-center gap-2" >
                        <RadioButton inputId="obdrateOption2" name="obdrateredio" value="disable" onChange={handleChangeobdRate} checked={obdrateStatus === 'disable'} />
                        <label htmlFor="obdrateOption2" className="text-gray-700 font-medium text-sm cursor-pointer">@ 30 sec</label>
                      </div>
                    </div>
                    <InputField
                      id="transratesobd"
                      name="transratesobd"
                      label="Rate"
                      placeholder="(INR / Credit)"
                      value={obdrate}
                      onChange={(e) => validateInput(e.target.value, setObdRate)}
                      type="number"
                    />
                  </div>
                  <div className='flex justify-center mt-3'>
                    <UniversalButton
                      label="Save"
                      id="whatsappsave"
                      name="whatsappsave"
                    />
                  </div>
                </div>

              )}
            </div>
          </CustomTabPanel>
        </Box>
      </Dialog>
      {/* assignService */}

      {/* Manage Api Key */}
      <Dialog
        header="Manage Api Key "
        visible={manageApiKeys}
        onHide={() => setManageApiKeys(false)}
        className="w-[30rem]"
        draggable={false}
      >
        Manage Api Key
      </Dialog>
      {/* Manage Api Key */}

      {/* reset service */}
      <Dialog
        header="reset service"
        visible={reset}
        onHide={() => setreset(false)}
        className="w-[30rem]"
        draggable={false}
      >
        reset service
      </Dialog>
      {/* reset service */}

      {/* User Report */}
      <Dialog
        header="User Report"
        visible={userReports}
        onHide={() => setuserReports(false)}
        className="w-[30rem]"
        draggable={false}
      >
        User Report
      </Dialog>
      {/* User Report */}
    </>
  );
}

export default ManageUserTable
