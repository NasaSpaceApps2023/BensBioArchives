import { useState } from "react";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Markdown from 'react-markdown'

import "./ContentTabs.scss";
import Ben from "@/components/ben";

//const demoResult = 'The most relevant dataset for protein crystallization is "Zero-G Protein Crystallization" and it includes features such as studying protein crystallization in a microgravity environment and using human and bacterial organisms.'

async function fetchPromptResponse(prompt: string): Promise<any> {
    const endpoint = `https://biobase-zi7cq.ondigitalocean.app/query/?query_string=${prompt}`;

    try {
        const response = await fetch(endpoint);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

const PromptsContent = () => {
    const [fetching, setFetching] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [results, setResults] = useState("");

    const handleSubmit = async () => {
        setFetching(true);
        const res = await fetchPromptResponse(prompt)
        console.log(res);
        setResults(res.answer);
        setFetching(false);
    }

    return (
        <div className="tab-content">
            <div className="h-[100%]">
                {!fetching && results === "" &&
                    <>
                        <div className="submit-area">
                            <div className="grid w-full gap-2 max-w-[600px] h-[128px]">
                                <Textarea value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)} placeholder="Describe the data or model you are interested in" />
                                <Button onClick={() => handleSubmit()}>Submit</Button>
                            </div>
                        </div>
                        <div className="big-ben">
                            <Ben />
                        </div>
                    </>
                }
                {fetching && results === "" &&
                    <Skeleton className="w-[600px] h-[128px]" />
                }
                {results !== "" &&
                    <div className="markdown-container">
                        <Markdown>{"# Question:"}</Markdown>
                        <Markdown>{prompt}</Markdown>
                        <Markdown>{"# Answer:"}</Markdown>
                        <Markdown>{results}</Markdown>
                        <div className="pt-2 m-auto">
                            <Button onClick={() => setResults("")}>Clear</Button>
                        </div>
                    </div>

                }
            </div>
        </div >

    )
}

export default PromptsContent