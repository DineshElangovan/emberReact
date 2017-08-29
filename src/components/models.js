import React,{Component} from 'react';
import { render } from 'react-dom';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import { connect } from 'react-redux';
import * as actions from '../actions';
import _ from 'lodash';
class Models extends Component{
 componentWillMount() {
    
    
  }
  renderdetails(){
      const id=this.props.params.id;
       return  this.props.patientlist.filter(function(o) {
        return o._id.$oid === id;
    })
      .map(patient=>{
            return(
                    <tr key={patient.id}>
                    <td><h1>{patient.name}</h1></td>
                    <td>
                    <h5>Gender:{patient.features.gender.value}</h5>
                    <h5>Age:{patient.features.age.value}</h5>
                    <h5>Date of Birth:{patient.birthdate}</h5>
                    <h5>Medical Record Number{patient.medical_record_number}</h5>
                    </td>
                    </tr>
            )
      })

  }
    render(){
       
        if(!this.props.patientlist){
            return <div> Loading!!!</div>
        }
        return(
            <div> 
            <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <table className="table">
                        <tbody>
                   {this.renderdetails()}
                    </tbody>
                </table>
            </div>
            </div> 
            <Tabs className="tabs tabs-1">
            <div className="tab-links">
                <TabLink to="tab1"><h2>Available Models</h2></TabLink>
                <TabLink to="tab2"><h2>Gnemonics Exploration</h2></TabLink>
            </div>

            <div className="content">
                <TabContent for="tab1">
                    <h5>Models</h5>
                    
                </TabContent>
                <TabContent for="tab2">
                    <h5>Gnemonics</h5>
                    
                </TabContent>
                
            </div>
        </Tabs>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return { patientlist:state.auth.message  };
}

export default connect (mapStateToProps,actions)(Models)