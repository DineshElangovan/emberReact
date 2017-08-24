import React,{Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _ from 'lodash';
import SearchBar from './searchbar'
class PatientSearch extends Component{
    constructor(props) {
    super(props);

    this.state = {
     
      filterbyfirstname: '',
      filterbylastname:'',
      filterbymedicalno:''
    };
  }
    componentWillMount() {
    this.props.fetchPatients();
  }
  handleChange(e) {
     
    this.setState({ filterbyfirstname: e.target.value });
  }
  handleChange1(e) {
     
    this.setState({ filterbylastname: e.target.value });
  }
  handleChange2(e) {
      
    this.setState({ filterbymedicalno: e.target.value });
  }
  renderpost(){
      return  this.props.message
      .filter(patient=>{
          return patient.first_name.toLowerCase().indexOf(this.state.filterbyfirstname.toLowerCase())>=0 && patient.last_name.toLowerCase().indexOf(this.state.filterbylastname.toLowerCase())>=0 && patient.medical_record_number.toLowerCase().indexOf(this.state.filterbymedicalno.toLowerCase())>=0;
      })
      .map(patient=>{
            return(
                <tr key={patient.id}>
                <td>{patient.last_name}</td>
                <td>{patient.first_name}</td>
                <td> {patient.features.age.value}</td>
                <td> {patient.features.gender.value}</td>
                <td> {patient.birthdate}</td>
                <td> {patient.medical_record_number}</td>
                </tr>
            );
        })
  }
  
    render(){
        if(!this.props.message){
            return (
                <div><h3> PatientSearch</h3>
               
            <table className="table">
            <thead className="thead-inverse">
                <tr>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>BirthDate</th>
                <th>MedicalRecordNumber</th>
                </tr>
            </thead>
            <tbody>
              <tr><td colSpan={3}>Loading!!!!!</td></tr>
            </tbody>
            </table>
            </div>
            );
        }
        return(
             <div>
                 <form className="form-group">
                     <input 
                        type="text" className="form-control"
                        value={this.state.filterbyfirstname} 
                        onChange={ this.handleChange.bind(this) } 
                        placeholder="filterbyfirstname" />
                        <input 
                        type="text" className="form-control"
                        value={this.state.filterbylastname} 
                        onChange={ this.handleChange1.bind(this) } 
                        placeholder="filterbylastname" />
                        <input 
                        type="text" className="form-control"
                        value={this.state.filterbymedicalno} 
                        onChange={ this.handleChange2.bind(this) } 
                        placeholder="filterbymedical"/>
                </form>
                <h3> PatientSearch</h3>
            <table className="table">
            <thead className="thead-inverse">
                <tr>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>BirthDate</th>
                <th>MedicalRecordNumber</th>
                </tr>
            </thead>
            <tbody>
                 {this.renderpost()}
            </tbody>
            </table>
            </div>
                
    
        );
    }
}

function mapStateToProps(state) {
  return { message: state.auth.message };
}

export default connect(mapStateToProps, actions)(PatientSearch);