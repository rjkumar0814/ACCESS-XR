/******************************************************************************
 * ACCESS-XR
 * Prediction History Table
 ******************************************************************************/

import { useMemo, useState } from "react";

import {
    Box,
    Button,
    LinearProgress,
    Stack,
    Typography,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";

import {
    DataGrid,
    GridColDef,
    GridToolbar,
} from "@mui/x-data-grid";

export interface PredictionRecord {

    id: number;

    timestamp: string;

    modality: string;

    prediction: string;

    confidence: number;

    processingTime: number;

    modelVersion: string;

}

interface PredictionTableProps {

    rows: PredictionRecord[];

}

export default function PredictionTable({

    rows,

}: PredictionTableProps) {

    const [selection, setSelection] =
        useState<number[]>([]);

    const columns = useMemo<GridColDef[]>(() => [

        {

            field: "timestamp",

            headerName: "Timestamp",

            flex: 1.3,

        },

        {

            field: "modality",

            headerName: "Modality",

            flex: 1,

        },

        {

            field: "prediction",

            headerName: "Prediction",

            flex: 1.4,

        },

        {

            field: "confidence",

            headerName: "Confidence",

            flex: 1.4,

            renderCell: (params) => (

                <Box
                    sx={{
                        width: "100%",
                    }}
                >

                    <LinearProgress

                        variant="determinate"

                        value={params.value * 100}

                    />

                    <Typography
                        variant="caption"
                    >

                        {(params.value * 100).toFixed(1)}%

                    </Typography>

                </Box>

            ),

        },

        {

            field: "processingTime",

            headerName: "Latency (ms)",

            flex: 1,

        },

        {

            field: "modelVersion",

            headerName: "Model",

            flex: 1,

        },

    ], []);

    const exportJSON = () => {

        const blob = new Blob(

            [

                JSON.stringify(

                    rows,

                    null,

                    2

                ),

            ],

            {

                type: "application/json",

            }

        );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "prediction_history.json";

        link.click();

        URL.revokeObjectURL(url);

    };

    const exportCSV = () => {

        const header = [

            "Timestamp",

            "Modality",

            "Prediction",

            "Confidence",

            "Processing Time",

            "Model",

        ];

        const csvRows = rows.map(

            (row) => [

                row.timestamp,

                row.modality,

                row.prediction,

                row.confidence,

                row.processingTime,

                row.modelVersion,

            ].join(",")

        );

        const csv = [

            header.join(","),

            ...csvRows,

        ].join("\n");

        const blob = new Blob(

            [csv],

            {

                type: "text/csv",

            }

        );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "prediction_history.csv";

        link.click();

        URL.revokeObjectURL(url);

    };

    return (

        <Box>

            <Stack

                direction="row"

                spacing={2}

                mb={2}

            >

                <Button

                    variant="outlined"

                    startIcon={
                        <DownloadIcon />
                    }

                    onClick={exportCSV}

                >

                    Export CSV

                </Button>

                <Button

                    variant="contained"

                    startIcon={
                        <DownloadIcon />
                    }

                    onClick={exportJSON}

                >

                    Export JSON

                </Button>

            </Stack>

            <DataGrid

                rows={rows}

                columns={columns}

                checkboxSelection

                disableRowSelectionOnClick

                pageSizeOptions={[5, 10, 25, 50]}

                initialState={{

                    pagination: {

                        paginationModel: {

                            pageSize: 10,

                            page: 0,

                        },

                    },

                }}

                slots={{

                    toolbar: GridToolbar,

                }}

                onRowSelectionModelChange={

                    (selectionModel) =>

                        setSelection(

                            selectionModel.map(

                                Number

                            )

                        )

                }

                autoHeight

            />

            <Typography

                variant="body2"

                sx={{ mt: 2 }}

            >

                Selected rows:

                {" "}

                {selection.length}

            </Typography>

        </Box>

    );

}
