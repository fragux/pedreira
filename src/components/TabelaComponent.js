import React, { useEffect, useState, forwardRef } from "react";
import { Card, Modal, ModalHeader, ModalBody } from "reactstrap";
import { Chart } from "react-charts";
import "./TabelaComponent.css";
import MaterialTable from "material-table";
import axios from "axios";
import { ProgressBar } from "react-bootstrap";
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FirstPage,
  LastPage,
  ViewColumn,
  SaveAlt,
  FilterList,
  Search,
  Remove,
} from "@material-ui/icons";
import { FlexFlowContext } from "twilio/lib/rest/flexApi/v1/flexFlow";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import Machine from "./MachineComponent";
import { getDatasetAtEvent } from "react-chartjs-2";

export default function MyChart({ selectedMaquina, machine, time, erros }) {
  const columns = [
    {
      title: "Data",
      field: "DateTime",
      type: "datetime",
      dateSetting: {
        format: "dd/MM/yyyy",
        locale: "pt-PT"
      },
      
    },
    {
      title: "Power",
      field: "Power",
    },
    {
      title: "Produção",
      field: "Production",
      render: (rowData) => {
        if (rowData.Production < 30 )
          return (
            <ProgressBar
              variant="danger"
              now={rowData.Production}
              label={`${rowData.Production}%`}
              style={{ height: "18px" }}
            />
          );
        else if (rowData.Production >= 90)
          return (
            <ProgressBar
              variant="success"
              now={rowData.Production}
              label={`${rowData.Production}%`}
              style={{ height: "18px" }}
            />
          );
        else if (rowData.Production >= 30 && rowData.Production <= 90)
          return (
            <ProgressBar
              variant="warning"
              now={rowData.Production}
              label={`${rowData.Production}%`}
              style={{ height: "18px" }}
            />
          );
      },
    },
    {
      title: "Trabalho",
      field: "Job",
    },
    {
      title: "Tensão",
      field: "Tension",
      render: (rowData) => { return (<b>{Math.round(rowData.Tension)}</b>)}
    },
    {
      title: "Alarme",
      field: "Alarm",
    },
  ];

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  const [data, setData ] = useState();
  
  async function getData(name){
    if (name === "STONECUT") name = "cnc1";
    else if (name === "STONECUT45MILL") name = "cnc2";
    else if (name === "MINORÇA") name = "minorca";
    else if (name === "LOUSADA") name = "lousada";
    
    if(erros === false){
      await axios.get(`http://localhost:3001/machine/${name}/${time}`).then((response) => {
        setData(response.data );
      });
    }
    else if (erros)
    await axios.get(`http://localhost:3001/machine/${name}/alarms/${time}`).then((response) => {
      setData(response.data );
    });
    
  }
  useEffect(() => {
  if(selectedMaquina)
   getData(selectedMaquina);
    console.log("Tempo selecionado para tabela", time)
  }, [machine, selectedMaquina, time, erros]);


  
  return (
    <>
      <div className="container-tabela" >
        <MaterialTable style={ {boxShadow :"none", border: "none"}}
          minRows={10}
          icons={tableIcons}
          title={<b style={{background: "#e4181d", padding:"1rem", color: "white", borderRadius:"5rem"}}>{selectedMaquina}</b>}
          data= {data}
          columns={columns}
          options={{
            pageSize: 8,
            pageSizeOptions: [5, 10, 20, 50, 100],
            rowStyle: {
              fontSize: 14,
              textAlign: "center",
              fontSizeAdjust: true,
            },
            cellStyle: {
              textAlign: "center",
            },
            headerStyle: {
              fontSize: 14,
              fontWeight: "bold",
              textAlign: "center",
              background: "",
              fontSizeAdjust: true,
            },
            //filtering: true,
            paging: true,
            search: true,
            exportButton: true,
            addRowPosition: true,
          }}
        />
      </div>
    </>
  );
}
