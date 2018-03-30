import React, { Component } from 'react';
import Slider from 'react-slick';
import ReactDOM from 'react-dom';
import logo from './bucknellLogo.png';
import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Ray Bucknell</h1>
//         </header>
//         <p className="App-intro">
//           Let's find you some classes.
//         </p>
//         <div> <MyComponent /> </div>
//         <div> <SimpleSlider /> </div>
//       </div>
//     );
//   }
// }

class App extends Component {

 constructor(){
    super();   

    /*binding "This" to the function loadMainPageCallBack because of javascript function inside function
    loses the scope of what this is, so this is needed so the callback function refers back to ViewEvents*/
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {htmlcode: ""}
  }

  static defaultProps = {departments: ["ACFM", "OFFAF", "ANBE", "ANTH", "ARBC", "ARTH",
                        "ARST", "ARTR" , "BIOL", "BMEG" , "OFFL", "OFFD", "OFFF",
                        "OFFAT", "OFFGH", "OFFG", "OFFCB", "CHEG", "CSCI", "CHIN",
                        "CEEG", "CLAS" , "ENCW", "DANC", "OFFDN", "EAST", "ECON",
                        "EDUC", "ECEG", "ENGR", "ENGL", "ENST", "ENFS", "FOUN", 
                        "FREN" , "GEOL", "GEOG", "GRMN", "GREK", "GLBM", "HEBR",
                        "HIST", "HUMN", "IDPT", "OFFJP", "JAPN", "LATN", "LAMS"
                        , "LEGL", "LING", "ENLS", "MGMT", "MSUS", "MIDE",
                        "MATH", "MECH", "MILS", "MUSC", "NEUR", "OCST", "PHIL",
                        "PHYS", "POLS", "PSCY", "RELI", "RUSS", "RESC", "SIGN",
                        "SPAN", "SOCI", "SLIF", "THEA", "UNIV", "WMST"] ,
                
                        requirements: ['N/A', 'AHLG', 'ARHC', 'CBL', 'CCFL', 'CCIP', 'CCQR', 
                        'DUSC', 'EGHU', 'EGSS', 'EVCN', 'FOUN', 'FRST', 'GBCC', 
                        'GLSP', 'LBSC', 'NMLG', 'NSMC', 'RESC', 'SL',  'SLSC', 
                        'SSLG', 'W1', 'W2'] ,
                }

  handleSubmit(e){
    e.preventDefault()
    var department = "Department=" + this.refs.department.value
    var ccc = "CCCReq=" + this.refs.ccc.value

    if(this.refs.ccc.value === "N/A"){
      ccc= ""
    }
    var query = department + "&" + ccc
    console.log(query)

    fetch('https://www.eg.bucknell.edu/~amm042/service/q?'+ query)
      .then( response => {
          var json = response.json()
          return json
        }).then(jsonResponse => {
          console.log(jsonResponse)
          console.log(jsonResponse["message"])
          this.renderClasses(jsonResponse["message"])
        })

      .catch( error => console.log("ERROR", error)) 
  }

  renderClasses(classes){
    var html = []
    for (var i = 0; i < classes.length;  i += 1) {
      html.push("CRN: "+ classes[i]["CRN"] + ", Title: "+ classes[i]["Title"] +
       ", Course Name: " + classes[i]["Course"] +", Meeting Time: " + classes[i]["Meeting Time"])
    }

    const listItems = html.map((text) => <div className="data-box">{text}</div>);

    console.log(html)
    this.setState({htmlcode: listItems})
  }

  render() {

    let Department = this.props.departments.map(category => {
          return <option key={category} value={category}>{category}</option>
        })

    let CCC = this.props.requirements.map(category => {
          return <option key={category} value={category}>{category}</option>
        })


    var htmlCode = this.state.htmlcode 
    console.log("In render here is htmlcode = ", htmlCode)
    return (
    <div>
      <div className = "container App">
        <br></br>
        <header className="App-header">
           <img src={logo} className="App-logo" alt="logo" />
           <h1 className="App-title">Ray Bucknell</h1>
        </header>
        <div id= "information" className="black-box">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div>
                  <label>Department</label><br />
                    <select ref="department">
                      {Department}
                    </select>
              </div>
              <br></br>
              <div>
                  <label>CCC Requirement</label><br />
                    <select ref="ccc">
                      {CCC}
                    </select>
              </div>

              <br />
              <input type="submit" className="btn btn-primary" value="Find Classes"/>
              <br />

            </form>
            <br />  
          </div> 

          <div id="courses">
              <div>{htmlCode}</div>
          </div>
        </div> 
    </div>
    );

        
  }
}

class SimpleSlider extends React.Component {
    render() {
        var settings = {
            dots: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3
        };
        return (
            <Slider {...settings}>
                <div>
                    <img src="http://placekitten.com/g/400/200" />
                </div>
                <div>
                    <img src="http://placekitten.com/g/400/200" />
                </div>
                <div>
                    <img src="http://placekitten.com/g/400/200" />
                </div>
                <div>
                    <img src="http://placekitten.com/g/400/200" />
                </div>
            </Slider>
        );
    }
}

class MyComponent extends React.Component{
    constructor() {
        super();
        this.state = {
            input: ''
        };
    }

    handleChange(e) {
        this.setState({ input: e.target.value });
    }

    handleClick() {
        //console.log(this.state.input);
    }

    render() {
        return (
        <div>
            <input type="text" onChange={ this.handleChange } />
            <input
            type="button"
            value="Search Classes!"
            onClick={this.handleClick}
            />
        </div>
        );
    }
}

export default App;
