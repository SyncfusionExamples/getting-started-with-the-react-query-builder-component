import { QueryBuilderComponent,  RuleChangeEventArgs,  RuleModel } from '@syncfusion/ej2-react-querybuilder';
import {GridComponent} from '@syncfusion/ej2-react-grids';
import { employeeData } from './data';
import { Query,Predicate} from '@syncfusion/ej2-data';
import './App.css';
import { useRef } from 'react';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
function App() {
  let qbObj = useRef<QueryBuilderComponent>(null);
  let gridObj = useRef<GridComponent>(null);
  
  let columnData = [
    { field: 'EmployeeID', label: 'EmployeeID', type: 'number' },
    { field: 'FirstName', label: 'FirstName', type: 'string' },
    { field:'TitleOfCourtesy', label:'TitleOfCourtesy', type:'boolean', values: ['Mr.', 'Mrs.']},
    { field:"Title", label:"Title", type:"string"},
    { field: 'HireDate', label: 'HireDate', type: 'date', format:"dd/MM/yyyy"},
    { field: 'Country', label: 'Country', type: 'string' },   
    { field: 'City', label: 'City', type: 'string' }
];
let gridData = [
  { field: 'EmployeeID',header: 'EmployeeID', width:'90' },
  { field: 'FirstName', header: 'FirstName',  width:'90'  },
  { field:'TitleOfCourtesy', header:'TitleOfCourtesy',  width:'90' },
  { field:'Title', header:'Title',  width:'120' },
  { field: 'HireDate', header: 'HireDate',format:"dd/MM/yyyy",  width:'120' },
  { field: 'Country', header: 'Country',  width:'120'  },   
  { field: 'City', header: 'City',  width:'120'  }
];
let importRules: RuleModel = {
  'condition': 'or',
  'rules': [{
    label: 'Title',
    field: 'Title',
    type: 'string',
    operator: 'endswith',
    value: 'Representative'
  }]
}; 
function updateRule(args:RuleChangeEventArgs|any){
 let predicate: Predicate|any= qbObj.current?.getPredicate(args.rule)
  if (isNullOrUndefined(predicate)) {
    if(gridObj.current != null)  {
    gridObj.current.query = new Query().select([
          "EmployeeID",
          "FirstName",
          "TitleOfCourtesy",
          "Title",
          "HireDate",
          "Country",
          "City"
      ]);
  }}
  else {
    if(gridObj.current != null)  {
      gridObj.current.query = new Query()
          .select([
            "EmployeeID",
            "FirstName",
            "TitleOfCourtesy",
            "Title",
            "HireDate",
            "Country",
            "City"
      ]).where(predicate);
  }}
 gridObj.current?.refresh();
}
const onGridCreated = () =>{
  updateRule({rule: qbObj.current?.getValidRules(qbObj.current.rule)});
}
  return (
    <div className="App">
    <QueryBuilderComponent columns={columnData} rule={importRules} ruleChange={updateRule} ref={qbObj}
    >

    </QueryBuilderComponent>
    <GridComponent dataSource={employeeData} columns={gridData} ref={gridObj} created={onGridCreated}
    >
    
    </GridComponent>
    </div>
  );
}
export default App;
