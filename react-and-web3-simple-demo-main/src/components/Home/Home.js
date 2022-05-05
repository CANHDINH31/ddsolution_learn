import React from 'react'
import Card from "../UI/Card/Card";
import classes from "./Home.module.css";

const Home = (props) => {
  return (
    <Card className={classes.home}>
      <h1>Welcome</h1>
      <p>Account: {props.currentAccount}</p>
      <p>NumberLogin: {props.numberLogin}</p>
    </Card>
  );
};
export default Home;
