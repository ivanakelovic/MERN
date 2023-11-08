
import React, {useState, useEffect} from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';


const Chart = (props) => {
    const [data, setData] = useState([]);

    const addEmptyBarData = (month, nextMonth, year, nextYear, newData) => {
        while (month < nextMonth || year < nextYear) {
            //adding empty rows
            newData.push({
                _id: `${year}-${month < 10 ? 0 : ''}${month}`,
                count: 0
            });
            if (month !== 12) {
                month++;
            } else {
                ++year;
                month = 1;
            }

        }
    }

    console.log('data1', data[1]);
    useEffect(() => {
        console.log('Chart data updated:', data);

        console.log('Data received in Chart:', props.data);
        // Update the data state when props.data changes
        //This function adds additional data to display
        if (props.data && Array.isArray(props.data)) {

            setData(prevData => {
                const newData = [];

                for (var i = 0; i <= props.data.length - 1; i++) {
                    //dodato da ne puca app pregledati
                    const item = props.data[i];
                    if (!item._id) {
                        // Skip items without a valid _id property
                        continue;
                    }

                    newData.push(props.data[i]);
                    var dateParts = props.data[i]._id.split("-");
                    var year = dateParts[0] * 1;
                    var month = dateParts[1] * 1;

                    if (i === props.data.length - 1) {
                        break;
                    }

                    var nextItemDate = props.data[i + 1]._id.split("-");
                    var nextYear = nextItemDate[0] * 1;
                    var nextMonth = nextItemDate[1] * 1;
                   // these have already been added
                    if (month !== 12) {
                        month++;
                    } else {
                        ++year;
                        month = 1;
                    }

                    addEmptyBarData(month, nextMonth, year, nextYear, newData);
                }
                return newData;
            });

        }
    }, [props.data]);

    return (
        <div className="container">
            <div className="row justify-content-center mt-4">
                <h2 className="text-center text-primary">Tender Trend</h2>
            </div>
            <ResponsiveContainer width="90%" height={500} className="row justify-content-center">
                <BarChart data={data}>
                    <XAxis dataKey="_id" />
                    <YAxis/>
                    <CartesianGrid stroke="#ccc"/>
                    <Bar type="monotone" fill="#EF1A07" dataKey="count" stroke="#EF1A07" strokeWidth={2}/>
                    <Tooltip cursor={{fill: 'transparent'}}/>
                    <Legend/>
                </BarChart>
            </ResponsiveContainer>
        </div>

    );
};

export default Chart;
