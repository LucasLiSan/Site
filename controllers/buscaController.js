import express from "express";
import bcrypt from "bcrypt";
import session from "express-session";
import Turistas from "../models/turistas.js";
import PontosTuristicos from "../models/pontos.js";
import Cidades from "../models/cidades.js";
const router = express.Router();

export default router;