import { fetchWithAuth } from "../apiClient.js";

// Get Waba Details
export const getWabaList = async () => {
  return await fetchWithAuth("/proCpaasRest/whatsapp/getwabadetails", {
    method: "GET",
  });
};


// Get All Template Details
export const getWabaTemplateDetails = async (wabaNumber) => {
  return await fetchWithAuth(
    `/proCpaasRest/whatsapptemplate/getTemplateList?wabaNumber=${wabaNumber}`,
    {
      method: "GET",
    }
  );
};

// Get particular waba Template Details
export const getWabaTemplate = async (wabaAccountId, templateName) => {
  return await fetchWithAuth(
    `/proCpaasRest/whatsapptemplate/getWhatsappTemplate?templateName=${templateName}&wabaAccountId=${wabaAccountId}`,
    {
      method: "GET",
    }
  );
};

// post request wahtsapp manage waba edit wahtsapp table
export const updateWabaDetails = async (data, phone) => {
  try {
    const response = await fetchWithAuth(`/proCpaasRest/whatsapp/UpdateBusinessProfileDetails?wabaNumber=${phone}`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    // if (response && response.status) {
    //   return response;
    // } else {
    //   throw new Error(response?.msg || "Image upload failed.");
    // }
    return response
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// post request wahtsapp manage waba profile
export const getwabadetails = async (wabaNumber) => {
  return await fetchWithAuth(
    `/proCpaasRest/whatsapp/getBusinessProfileDetails?wabaNumber=${wabaNumber}`,
    {
      method: "POST",
    }
  );
}

// post request settings password
export const getpassword = async (oldpass, newpass) => {
  try {
      const response = await fetchWithAuth("/proCpaasRest/settings/changePassword", {
          method: "POST",
          body: JSON.stringify({ oldpass, newpass }),
      });

      const data = await response.json();
      console.log("Response:", data);

  } 
  catch (error) {
      console.error("Error:", error);
      alert("Failed to change password. Please try again.");
  }
};


// show groups list
export const getWabaShowGroupsList = async () => {
  return await fetchWithAuth("/proCpaasRest/group/showGroups", {
    method: "POST",
  });
};

// Campaign upload file - (excel)
export const campaignUploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetchWithAuth("/proCpaasRest/campaignFile/upload", {
      method: "POST",
      body: formData,
    });

    if (response) {
      console.log("excel file uplaod", response);
      return response;
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

// upload file - (image)
export const uploadImageFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetchWithAuth("/proCpaasRest/utility/upload", {
      method: "POST",
      body: formData,
    });

    if (response && response.status) {
      return response;
    } else {
      throw new Error(response?.msg || "Image upload failed.");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Send Whatsapp Campaign
export const sendWhatsappCampaign = async (campaignData) => {
  try {
    const response = await fetchWithAuth("/proCpaasRest/sendWhatsappCampaign", {
      method: "POST",
      body: JSON.stringify(campaignData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error("Error sending campaign:", error);
    throw error;
  }
};

// Get Whatsapp Campaign Report
export const getWhatsappCampaignReport = async (filters = {}) => {
  try {
    const formattedFromDate = filters.fromQueDateTime
      ? new Date(
        filters.fromQueDateTime.split("/").reverse().join("-")
      ).toLocaleDateString("en-GB")
      : new Date().toLocaleDateString("en-GB");

    const formattedToDate = filters.toQueDateTime
      ? new Date(
        filters.toQueDateTime.split("/").reverse().join("-")
      ).toLocaleDateString("en-GB")
      : new Date().toLocaleDateString("en-GB");

    const requestBody = {
      fromQueDateTime: formattedFromDate,
      toQueDateTime: formattedFromDate,
      campaignName: filters.campaignName || "",
      template_category: filters.template_category || "all",
    };

    console.log("Sending Request:", requestBody);

    const response = await fetchWithAuth(
      "/proCpaasRest/whatsapp/getCampaignReport",
      {
        method: "POST",
        body: JSON.stringify(requestBody),
      }
    );
    if (!response || !response.data) {
      console.error("Failed to fetch campaign report.");
      return [];
    }
    return response.data || [];
  } catch (error) {
    console.error("Error fetching campaign report:", error);
    return [];
  }
};

// Get Whatsapp Campaign Details Report
export const getWhatsappCampaignDetailsReport = async (campaignSrno) => {
  try {
    const response = await fetchWithAuth(
      "/proCpaasRest/whatsapp/whatsappCampaginDetailsReport",
      {
        method: "POST",
        body: JSON.stringify({
          campSrno: campaignSrno,
          mobno: "",
          status: "status",
        }),
      }
    );

    console.log("getWhatsappCampaignDetailsReport response", response);

    if (!response) {
      console.error("Failed to fetch campaign details report.");
      return [];
    }

    return response.data || [];
  } catch (error) {
    console.error("Error fetching campaign details report:", error);
    return [];
  }
};
