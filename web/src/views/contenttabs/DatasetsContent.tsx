import { Dataset, columns } from "./DatasetsColumns"
import { DataTable } from "./DatasetsTable";
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import "./ContentTabs.scss";
import { observer } from "mobx-react-lite";
import selectionStore from "@/store/selectionStore";
import FullDatasetPopover from "./FullDatasetPopover";

async function getData(): Promise<Dataset[]> {
    const apiUrl = 'https://biobase-zi7cq.ondigitalocean.app/get_all_space_data/';
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: Dataset[] = await response.json();
        return data;
    } catch (error) {
        // Handle errors here (e.g., network error, API error)
        console.error('Error fetching space data:', error);
        throw error; // Rethrow the error for the caller to handle
    }
}


const DatasetsContent = observer(() => {
    const [tableData, setTableData] = useState<JSX.Element | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await ReturnTable();
                setTableData(data);
            } catch (error) {
                console.error('Error fetching table data:', error);
            }
        };

        fetchData();
    }, []);


    const ReturnTable = async () => {
        const data = await getData()
        return (
            <DataTable columns={columns} data={data} />
        )
    }

    return (
        <div className="tab-content">
            <div className="w-full text-left relative">
                {selectionStore.selectedId !== null &&
                    <FullDatasetPopover />
                }
                <h2>All datasets:</h2>
                {tableData ? (
                    tableData
                ) : (
                    <Skeleton className="max-w-[1200px] h-[100%] m-auto" />
                )}
            </div>
        </div>
    )
})

export default DatasetsContent