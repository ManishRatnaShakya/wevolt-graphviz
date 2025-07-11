import axios from "axios";
import {useState, useEffect} from "react";
import Sites from "../json/meter-graph-data-dump.json";

export async function SitesList() {
    try{
        // const list = await axios.get("url");
        return Sites;
    }
    catch(err) {
        console.error(err);
    }
}  