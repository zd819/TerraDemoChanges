
const express = require("express");
const path = require("path");
const cors = require('cors');
const jwt = require('jsonwebtoken');
const http = require('http');

//Encryption
const fs = require('fs');
const https = require('https');

const app = express();
const HTTP_Port = 8080;
const HTTPS_Port = 8443;

//App setup
app.use(express.json());
app.use(cors());

