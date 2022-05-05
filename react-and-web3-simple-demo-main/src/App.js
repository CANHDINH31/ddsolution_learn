import React from "react";
import { useState, useLayoutEffect, useEffect } from "react";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Web3 from "web3";
import {
  loginAction,
  logoutAction,
  deleteAction,
  addAciton,
} from "./actions/accounts";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Modal, Input } from "antd";
import { DeleteOutlined } from "@material-ui/icons";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const accountsStore = useSelector((state) => state.accounts);
  const [isConnected, setIsConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [numberLogin, setNumberLogin] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [addingAccount, setAddingAccount] = useState(null);

  const onLogin = async (provider) => {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();

    if (accounts.length === 0) {
      console.log("Please connect to MetaMask!");
    } else if (accounts[0] !== currentAccount) {
      dispatch(loginAction(accounts[0]));
      setCurrentAccount(accounts[0]);
      setIsConnected(true);
    }
  };

  const onLogout = () => {
    dispatch(logoutAction(currentAccount));
    setIsConnected(false);
    setCurrentAccount(null);
    setNumberLogin(0);
  };
  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("accounts"));
    if (result) {
      result.forEach((item) => {
        if (item.status === true) {
          setCurrentAccount(item.account);
          setIsConnected(true);
          setNumberLogin(item.numberLogin);
        }
      });
      setDataSource(result);
    }
  }, [currentAccount]);

  const columns = [
    {
      title: "Account",
      dataIndex: "account",
      key: "account",
    },
    {
      title: "Number Login",
      dataIndex: "numberLogin",
      key: "numberLogin",
      sorter: (record1, record2) => {
        return record1.numberLogin > record2.numberLogin;
      },
    },
    {
      title: "Actions",
      render: (record) => {
        return <DeleteOutlined onClick={() => ondeleteAccount(record)} />;
      },
    },
  ];
  const ondeleteAccount = (record) => {
    dispatch(deleteAction(record));
    setDataSource(JSON.parse(localStorage.getItem("accounts")) || []);
  };
  const onAddingAccount = () => {
    setIsAdding(true);
  };
  const resetAdding = () => {
    setIsAdding(false);
    setAddingAccount(null);
  };
  return (
    <div>
      <header className="main-header">
        <h1>MetaMask</h1>
        {isConnected && (
          <nav className="nav">
            <ul>
              <li
                onClick={onLogout}
                style={{
                  color: "white",
                  cursor: "pointer",
                  fontSize: "1.6rem",
                }}
              >
                Logout
              </li>
            </ul>
          </nav>
        )}
      </header>
      <main>
        {!isConnected && (
          <>
            <Login onLogin={onLogin} onClick={onLogout} />
            {dataSource.length > 0 && (
              <div className="wrapTable">
                <Button onClick={onAddingAccount}>Add a address wallet </Button>
                <Table
                  className="table"
                  dataSource={dataSource}
                  columns={columns}
                  pagination={false}
                />
                <Modal
                  title="Add address wallet"
                  visible={isAdding}
                  okText="Add"
                  onCancel={() => {
                    resetAdding();
                  }}
                  onOk={() => {
                    dispatch(addAciton(addingAccount));
                    setDataSource(
                      JSON.parse(localStorage.getItem("accounts")) || []
                    );
                    resetAdding();
                  }}
                >
                  <Input
                    value={addingAccount}
                    onChange={(e) => {
                      setAddingAccount(e.target.value);
                    }}
                  />
                </Modal>
              </div>
            )}
          </>
        )}
        {isConnected && (
          <Home currentAccount={currentAccount} numberLogin={numberLogin} />
        )}
      </main>
    </div>
  );
}

export default App;
