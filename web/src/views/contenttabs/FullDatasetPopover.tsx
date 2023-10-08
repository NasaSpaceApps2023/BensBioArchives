import { Button } from '@/components/ui/button';
import { X } from "lucide-react"
import './ContentTabs.scss';
import selectionStore from '@/store/selectionStore';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

type FullDataset = {
    id: number
    study_title: string
    publication_date: string
    nsamples: number
    organism: string
    experimental_conditions?: string
    control: string
    link: string
    abstract: string
}

const FullDatasetPopover: React.FC = () => {
    const [datasetData, setDatasetData] = useState<FullDataset | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://biobase-zi7cq.ondigitalocean.app/get_space_data_with_id/?id=${selectionStore.selectedId}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setDatasetData(data[0]); // Assuming the API response has a 'data' field
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the async function to fetch data

    }, []);

    return (
        <>
            <div className="overlay"></div>
            <div className="content-container overflow-y-auto">
                <div className='p-2 flex justify-between'>
                    {datasetData ?
                        <h1>{datasetData.study_title}</h1>
                        :
                        <Skeleton className="w-[100%] h-[32px]" />
                    }
                    <Button variant="outline" size="icon" className='flex-shrink-0'>
                        <X className="h-4 w-4" onClick={() => selectionStore.setSelectedId(null)} />
                    </Button>
                </div>
                {datasetData && (
                    <div className='p-4'>
                        <h2>ID:</h2>
                        <p className='mb-2'>{datasetData.id}</p>

                        <h2>Study Title:</h2>
                        <p className='mb-2'>{datasetData.study_title}</p>

                        <h2>Publication Date:</h2>
                        <p className='mb-2'>{datasetData.publication_date}</p>

                        <h2>Number of Samples:</h2>
                        <p className='mb-2'>{datasetData.nsamples}</p>

                        <h2>Organism:</h2>
                        <p className='mb-2'>{datasetData.organism}</p>

                        <h2>Experimental Conditions:</h2>
                        <p className='mb-2'>{datasetData.experimental_conditions || 'N/A'}</p>

                        <h2>Control:</h2>
                        <p className='mb-2'>{datasetData.control}</p>

                        <h2>Link:</h2>
                        <p className='mb-2'>{datasetData.link}</p>

                        <h2>Abstract:</h2>
                        <p className='mb-2'>{datasetData.abstract}</p>
                    </div>
                )
                }
            </div>
        </>
    );
};

export default FullDatasetPopover;

