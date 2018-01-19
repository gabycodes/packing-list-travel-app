import React from 'react';
import ReactDOM from 'react-dom';
import AddClothing from './components/AddClothing.js';
import AddShoes from './components/AddShoes.js';
import AddToiletries from './components/AddToiletries';
import AddElectronics from './components/AddElectronics';
import AddMiscellaneous from './components/AddMiscellaneous';
import Header from './components/Header'

var config = {
  apiKey: "AIzaSyCbxJdKcjXziruqH-BIGpSneqMW3OOF_fc",
  authDomain: "travel-app-52d0d.firebaseapp.com",
  databaseURL: "https://travel-app-52d0d.firebaseio.com",
  projectId: "travel-app-52d0d",
  storageBucket: "travel-app-52d0d.appspot.com",
  messagingSenderId: "395512975538"
};
firebase.initializeApp(config);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      formToShow: '',
      email: '',
      password: '',
      confirm: '',
      isAuth: false,
      userName: ''
    }
    this.formToShow = this.formToShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setIsAuth = this.setIsAuth.bind(this);
    this.removePeriod = this.removePeriod.bind(this);
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dbRef.on("value", (firebaseData) => {
          const userData = firebaseData.val();
        });
      }
      else {
        console.log("You are not signed in");
      }
    });
  }
  setEmail(email) {
    this.setState({
      userEmail: email
    })
  }
  setIsAuth(bool) {
    this.setState({
      isAuth: bool
    })
  }
  formToShow(e) {
    e.preventDefault();
    this.setState({
      formToShow: e.target.className
    })
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  removePeriod(email) {
    return email.replace(/[.]/g, "");
  }
  signup(e) {
    e.preventDefault();
    if (this.state.password === this.state.confirm) {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((data) => {
          this.setIsAuth(true);
          this.setState({
            userName: this.removePeriod(this.state.email)
          })
          this.child.getStoredData()
        })
    }
  }
  login(e) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((data) => {
        this.setIsAuth(true);
        this.setState({
          userName: this.removePeriod(this.state.email)
        })
        this.child.getStoredData()
      })
  }

  render() {
    let loginForm = '';
    if (this.state.formToShow === 'signup') {
      loginForm = (
        <form onSubmit={this.signup} className="user-form signup">
          <label aria-hidden="true" htmlFor="email">Email: </label>
          <input type="email" name="email" placeholder="email" onChange={this.handleChange} />
          <label aria-hidden="true" htmlFor="password">Password: </label>
          <input type="password" name="password" placeholder="password" onChange={this.handleChange} />
          <label aria-hidden="true" htmlFor="confirm">Confirm Password:</label>
          <input type="password" name="confirm" placeholder="confirm password" onChange={this.handleChange} />
          <button className="submit" >Submit</button>
        </form>
      );
    }
    else if (this.state.formToShow === "login") {
      loginForm = (
        <form onSubmit={this.login} className="user-form login">
          <label aria-hidden="true" htmlFor="email">Email: </label>
          <input type="email" name="email" placeholder="email" onChange={this.handleChange} />
          <label aria-hidden="true" htmlFor="password">Password: </label>
          <input type="password" name="password" placeholder="password" onChange={this.handleChange} />
          <button className="submit" >Submit</button>
        </form>
      );
    }
    return (
      <section className="mainPage">
        <nav>
          <ul className="clearfix">
            <li><button href="" className="signup" onClick={this.formToShow}>Sign Up</button></li>
            <li><button href="" className="login" onClick={this.formToShow}>Log In</button></li>
          </ul>
          {loginForm}
        </nav>

        <Header />
        <AddClothing userEmail={this.state.userEmail} userName={this.state.userName} ref={instance => { this.child = instance; }}/>
        <AddShoes userEmail={this.state.userEmail} userName={this.state.userName}/>
        <AddToiletries userEmail={this.state.userEmail} userName={this.state.userName}/>
        <AddElectronics userEmail={this.state.userEmail} userName={this.state.userName}/>
        <AddMiscellaneous userEmail={this.state.userEmail} userName={this.state.userName}/>
      </section>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
