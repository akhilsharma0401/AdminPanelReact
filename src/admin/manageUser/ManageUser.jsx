import React from 'react'
import UniversalButton from '../../whatsapp/components/UniversalButton'
import InputField from '../../whatsapp/components/InputField'
import AnimatedDropdown from '../../whatsapp/components/AnimatedDropdown'
import { IoSearch } from "react-icons/io5";

const ManageUser = () => {
  return (
    <div>
       <div className="flex flex-wrap gap-4 items-end justify-end align-middle pb-1 w-full">
          {/* Name Input Field */}

          <div className="w-max-content">
            <UniversalButton
              id="manageoptinsettingsbtn"
              name="manageoptinsettingsbtn"
              label="Optin Settings"
              // disabled={selectedRows.length === 0}
              onClick={() => setIsSettingsOpen(true)}
            />
          </div>

          <div className="w-max-content">
            <UniversalButton
              id="manageoptinblockbtn"
              name="manageoptinblockbtn"
              label="Block & Optin"
              // disabled={selectedRows.length === 0}
              onClick={() => setIsModalOpen(true)}
            />
          </div>

          <div className="w-max-content">
            <UniversalButton
              id="manageoptinexportbtn"
              name="manageoptinexportbtn"
              label="Export"
              // disabled={selectedRows.length === 0}
            />
          </div>
          <div className="w-max-content">
            <UniversalButton
              id='manageoptinimportbtn'
              name='manageoptinimportbtn'
              label="Import"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 items-end justify-start align-middle pb-3 w-full">
          {/* Name Input Field */}
          <div className="w-full sm:w-48">
            {/* <InputField
              label="Name"
              id="manageuserid"
              name="manageuserid"
              placeholder="Enter User ID"
              // value={manageuserid}
              // onChange={handleNameChange}
            /> */}
          </div>

          {/* Mobile Number Input */}
          <div className="w-full sm:w-48">
            <InputField
              label="Mobile Number"
              id="optinmobile"
              name="optinmobilename"
              placeholder="Enter Mobile Number"
              type='number'
              // value={optinMobile}
              // onChange={handleMobileChange}
            />
          </div>

          {/* Opt-in Dropdown */}
          <div className="w-full sm:w-48">
            <AnimatedDropdown
              label="Optin"
              placeholder="Select Optin"
              id="optinyesno"
              name="optionyesnoname"
              // options={options}
              // value={selectedOption}
              // onChange={setSelectedOption}
            />
          </div>

          {/* Incoming Blocked Dropdown */}
          <div className="w-full sm:w-48">
            <AnimatedDropdown
              label="Incoming Blocked"
              placeholder="Incoming Blocked"
              id="incomingblocked"
              name="incomingblocked"
              // options={options2}
              // value={selectedOption2}
              // onChange={setSelectedOption2}
            />
          </div>

          {/* ✅ Search Button */}
          <div className="w-max-content">
            <UniversalButton
              id="manageoptinsearchbtn"
              name="manageoptinsearchbtn"
              // label={isFetching ? "Searching..." : "Search"}
              icon={<IoSearch />}
              // onClick={handleSearch}
              // disabled={isFetching}
            />
          </div>
          <div className="w-max-content ">
            <UniversalButton
              id='manageoptinDeletebtn'
              name='manageoptinDeletebtn'
              label="Delete"
            />
          </div>
        </div>
    </div>
  )
}

export default ManageUser;
