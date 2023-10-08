import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

interface ModelData {
    id: number;
    model_name: string;
    short_description: string;
    long_description: string;
    link: string;
}

const getAllModelData = async (): Promise<ModelData[]> => {
    try {
        const response = await fetch('https://biobase-zi7cq.ondigitalocean.app/get_all_model_data/');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data: ModelData[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching model data:', error);
        throw new Error('Error fetching model data');
    }
};

const ModelsContent = () => {
    const [models, setModels] = useState<ModelData[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const modelData: ModelData[] = await getAllModelData();
                console.log(modelData);
                setModels(modelData);
                // Handle the model data as needed
            } catch (error) {
                // Handle errors, e.g., show an error message to the user
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [])

    return (
        <div className="tab-content">
            <div className="w-full text-left">
                <h2>
                    Models:
                </h2>
                <div className="models-container card-container">
                    {models.length > 0 ?
                        <>
                            {
                                models.map(model => {
                                    return (
                                        <Card key={model.id} className="card">
                                            <CardHeader>
                                                <CardTitle>{model.model_name}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p>{model.short_description}</p>
                                            </CardContent>
                                            <CardFooter className="flex justify-center">
                                                <Button onClick={() => window.open(model.link, '_blank')}>Download Model</Button>
                                            </CardFooter>
                                        </Card>
                                    )
                                })
                            }
                        </>
                        :
                        <>
                            {[1, 2, 3].map(id => {
                                return (
                                    <Skeleton key={id} className="card h-[300px]" />
                                )
                            })}
                        </>

                    }</div>

            </div>
        </div>

    )
}

export default ModelsContent