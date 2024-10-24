import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import CropTable from "../Components/CropComponents/CropTable";

const OrderList = () => {
  const phaseWiseArr = [
    "Phase IV Year (2023-2024 to 2025-2026)",
    "Phase III Year (2020-2021 to 2022-2023)",
  ];
  const { getCropTblData } = useContext(UserContext);
  const phases = ["Phase I", "Phase II", "Phase III", "Phase IV"];
  const [phaseFlag, setPhaseFlag] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  // ----GroupWise
  const [groupWiseCrop, setGroupWiseCrop] = useState([]);
  const [selectedGroupCrop, setSelectedGroupCrop] = useState("SPICES");
  // ----phaseWise
  const [phaseWiseCrop, setPhaseWiseCrop] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);

  useEffect(() => {
    if (phaseWiseCrop.length > 0 && selectedCrop === null) {
      const firstCrop = phaseWiseCrop[0];
      setSelectedCrop(firstCrop);
      fetchCropData({
        CropName: firstCrop,
        Phase: "Phase IV",
      });
    }
  }, [phaseWiseCrop, selectedCrop]);

  // ----
  const [cropLevel, setCropLevel] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [breadData, setBreadData] = useState([{}]);
  const [pieChartData, setPieChartData] = useState([]);
  const [phaseDropDown, SetPhaseDropDown] = useState([]);
  const [stateDropDown, SetStateDropDown] = useState(["All"]);
  const [districtTableData, setDistrictTableData] = useState([]);
  const [selectedPhases, setSelectedPhases] = useState([phaseWiseArr[0]]);
  useEffect(() => {
    getGroupWiseCrop();
  }, [selectedGroupCrop]);

  useEffect(() => {
    fetchStates();
  }, []);
 
  const getGroupWiseCrop = async () => {
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/groupWiseCrop`;
    try {
      const response = await axios.get(url);
      const groupWiseCrop = response?.data?.data || [];
      //groupWise
      let groupWiseCropGroupName = [];
      for (let i = 0; i < groupWiseCrop.length; i++) {
        groupWiseCropGroupName.push(groupWiseCrop[i].CropGroupName);
      }
      setGroupWiseCrop(groupWiseCropGroupName);

      const selectedCropGroup = groupWiseCrop.find(
        (group) => selectedGroupCrop === group.CropGroupName
      );
      setPhaseWiseCrop(selectedCropGroup.CropNames);
    } catch (error) {}
  };
  const fetchCropData = (body) => {
    let data;
    if (body) {
      data = body;
    } else {
      data = { CropName: selectedCrop, Phase: "Phase IV" };
    }

    getCropTblData(
      data,
      (apiRes) => {
        setTableData(apiRes?.data?.data.allCropDetails);
        setDistrictTableData(apiRes?.data?.data.allCropDetails);
        setPieChartData(apiRes?.data?.data);
      },
      (apiErr) => {}
    );
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedPhases(typeof value === "string" ? value.split(",") : value);
  };

  const handleStates = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setBreadData([{ name: state }]);
    if (event.target.value === "All") {
      fetchCropData({
        CropName: selectedCrop,
        Phase: "Phase IV",
      });
      setCropLevel(0);
    } else {
      fetchCropData({
        StateName: state,
        CropName: selectedCrop,
        Phase: "Phase IV",
      });
      setCropLevel(1);
    }
  };

  const handleCrops = (event) => {
    setSelectedCrop(event.target.value);
    setCropLevel(0);
    setBreadData([{}]);
    fetchCropData({
      CropName: event?.target?.value,
      Phase: "Phase IV",
    });
  };

  const handleGroupCrops = (event) => {
    setSelectedGroupCrop(event.target.value);
  };

  const handleSubmit = () => {
    setPhaseFlag(!phaseFlag);
  };

  const fetchStates = async () => {
    const url = `${process.env.REACT_APP_API_URL_LOCAL}/phaseWiseState`;
    try {
      const response = await axios.get(url);
      if (phaseDropDown.length) {
        setSelectedPhases([phaseDropDown[1]]);
      }
      let extractedDate = response?.data?.data || [];
      let result = [];
      for (let i = 0; i < extractedDate.length; i++) {
        result = extractedDate[i].StateName;
        result.unshift("All");
      }
      SetStateDropDown(result);
    } catch (error) {}
  };

  const handleClickCrop = (row) => {
    if (row?.StateName) {
      setSelectedState(row?.StateName);
    }
    if (cropLevel === 0) {
      setCropLevel(1);
      changeBreadcrumWithStates({ ...row, name: row.StateName }, 0);
      fetchCropData({
        StateName: row.StateName || row?.name,
        Phase: "Phase IV",
        CropName: selectedCrop,
      });
    } else if (cropLevel === 1) {
      setCropLevel(2);
      changeBreadcrumWithStates({ ...row, name: row.DistrictName }, 1);
      fetchCropData({ DistrictName: row.DistrictName, CropName: selectedCrop });
    }
  };

  const changeBreadcrumWithStates = (data, type) => {
    if (data.name === "ALL") {
      setBreadData([{ name: data.name }]);
    } else {
      if (type === 0) {
        setBreadData([{ name: data.name }]);
      } else {
        setBreadData((prev) => [...prev, data]);
      }
    }
  };

  const handleBreadcrum = (level, data) => {
    let newBread = breadData.filter((_, i) => i <= level);
    setBreadData(newBread);
  };

  const handleBreadcrumbClick = (level, row) => {
    handleBreadcrum(level, row);
    if (level === 0) {
      setCropLevel(1);
      fetchCropData({
        StateName: row.StateName || row?.name,
        Phase: "Phase IV",
        CropName: selectedCrop,
      });
    } else if (level === 1) {
      setCropLevel(2);
      fetchCropData({ DistrictName: row.DistrictName, CropName: selectedCrop });
    }
  };

  const UpdatedbreadData = breadData.map((data, index) => (
    <Link
      key={index}
      color="inherit"
      onClick={() => handleBreadcrumbClick(index, data)}
      style={{ cursor: "pointer" }}
    >
      {data.name === "All" ? "States" : data.name}
    </Link>
  ));
  const rows = [
    {
      id: 1,
      nursery_name: "Green Valley Nursery",
      plant_varity: "Mango",
      place_quantity: 150,
      farmer_name: "Rakesh Sharma",
      farm_address: "Village Sunari, Haryana",
      FarmerMobileNo: "9876543210",
      Status: "Pending",
    },
    {
      id: 2,
      nursery_name: "Flora Farms",
      plant_varity: "Guava",
      place_quantity: 200,
      farmer_name: "Sunita Devi",
      farm_address: "Bihar, Darbhanga",
      FarmerMobileNo: "9834567890",
      Status: "Approved",
    },
    {
      id: 3,
      nursery_name: "Green Land Nursery",
      plant_varity: "Banana",
      place_quantity: 100,
      farmer_name: "Amit Patel",
      farm_address: "Surat, Gujarat",
      FarmerMobileNo: "9898765432",
      Status: "Rejected",
    },
    {
      id: 4,
      nursery_name: "Plant Paradise",
      plant_varity: "Apple",
      place_quantity: 250,
      farmer_name: "Kavita Jain",
      farm_address: "Shimla, Himachal Pradesh",
      FarmerMobileNo: "9988776655",
      Status: "Pending",
    },
    {
      id: 5,
      nursery_name: "Eco Plant Nursery",
      plant_varity: "Papaya",
      place_quantity: 180,
      farmer_name: "Rajesh Kumar",
      farm_address: "Patna, Bihar",
      FarmerMobileNo: "9776655443",
      Status: "Approved",
    },
  ];
  
  return (
    <React.Fragment>
      <Grid
        style={{
          marginTop: "3rem",
          position: "sticky",
          top: -0.1,
          zIndex: 1000,
          borderBottomLeftRadius: "53px",
          borderBottomRightRadius: "53px",
          backgroundColor: "#426d52",
          height: "3rem",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: "2rem",
            marginTop: "-3rem",
          }}
          spacing={2}
        ></Grid>
      </Grid>
      <Grid sx={{ padding: "25px" }}>
        <Grid item lg={12} sm={12} xs={12}>
          <CropTable data={rows} handleClickCrop={handleClickCrop} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default OrderList;
