import React,{useState} from "react";

const DashboardCard=(props)=>{
    return(
        <div className = 'card card-rounded col m-2'>
            <div className="card-body">
                <div className="card-text text-center text-primary text h1">{props.number}</div>
                <div className="card-text text-center h3 ">{props.name}</div>
            </div>

        </div>
    );

}

export default DashboardCard;


